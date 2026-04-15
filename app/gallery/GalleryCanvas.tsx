"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useCursor,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  type GalleryArtworkMeta,
  GALLERY_IMAGE_URLS,
  galleryArtworks,
  getGalleryArtworkByIndex,
  isVideoSrc,
} from "./artworkData";

// ---------------------------------------------------------------------------
// Scene constants
// ---------------------------------------------------------------------------
const TORN_MASK_URL = "/assets/photo%20frame.png";
const COUNT = 48;
const SPHERE_RADIUS = 5.5;

export type GalleryThemeMode = "light" | "dark";

export type GalleryCanvasProps = {
  theme: GalleryThemeMode;
  onArtworkOpen: (art: GalleryArtworkMeta) => void;
};

const SCENE_BG: Record<GalleryThemeMode, string> = {
  dark: "#000000",
  light: "#eaeaea",
};

// ---------------------------------------------------------------------------
// Fibonacci sphere distribution
// ---------------------------------------------------------------------------
function fibonacciSphere(
  count: number,
  radius: number,
): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push([
      Math.cos(phi) * r * radius,
      y * radius,
      Math.sin(phi) * r * radius,
    ]);
  }
  return pts;
}

const POSITIONS = fibonacciSphere(COUNT, SPHERE_RADIUS);

// ---------------------------------------------------------------------------
// Shared hook — billboard + hover z-parallax + scale
// (called identically in both ArtCard and VideoArtCard)
// ---------------------------------------------------------------------------
function useCardMotion(
  basePosition: [number, number, number],
  hovered: boolean,
) {
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);
  const zOffsetRef = useRef(0);
  // pre-allocated vectors to avoid GC pressure per frame
  const _dir = useMemo(() => new THREE.Vector3(), []);
  const _scaleVec = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const _bp = useMemo(() => new THREE.Vector3(...basePosition), [basePosition]);

  useFrame(({ camera }) => {
    const g = groupRef.current;
    if (!g) return;

    // Upright billboard — yaw only, world-Y stays up
    g.lookAt(camera.position.x, g.position.y, camera.position.z);

    // Lerp scale
    scaleRef.current = hovered ? 1.1 : 1;
    _scaleVec.setScalar(scaleRef.current);
    g.scale.lerp(_scaleVec, 0.12);

    // Lerp z-parallax (push toward camera on hover)
    zOffsetRef.current = hovered ? 0.38 : 0;
    _dir.subVectors(camera.position, g.position).normalize();
    g.position.lerp(
      _bp.clone().addScaledVector(_dir, zOffsetRef.current),
      0.12,
    );
  });

  return groupRef;
}

// ---------------------------------------------------------------------------
// Card geometry helpers (pure, no hooks)
// ---------------------------------------------------------------------------
function cardDims(artwork: GalleryArtworkMeta, map: THREE.Texture) {
  const img = map.image as HTMLImageElement | HTMLVideoElement | undefined;
  const iw =
    img instanceof HTMLVideoElement ? img.videoWidth : (img as HTMLImageElement | undefined)?.width;
  const ih =
    img instanceof HTMLVideoElement ? img.videoHeight : (img as HTMLImageElement | undefined)?.height;
  const aspect = iw && ih ? iw / ih : 16 / 9;
  const seed = parseInt(artwork.id.replace(/\D/g, "") || "0", 10);
  const h = 0.5 + (seed % 5) * 0.028;
  const w = h * aspect;
  return { w, h, pad: 1.048 };
}

// ---------------------------------------------------------------------------
// HoverRing — shared hover highlight mesh
// ---------------------------------------------------------------------------
function HoverRing({ w, h }: { w: number; h: number }) {
  return (
    <mesh>
      <planeGeometry args={[w + 0.04, h + 0.04]} />
      <meshBasicMaterial
        color="#a78bfa"
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// ArtCard — static image, receives pre-loaded texture from parent
// ---------------------------------------------------------------------------
function ArtCard({
  basePosition,
  texture,
  tornMask,
  artwork,
  theme,
  onSelect,
}: {
  basePosition: [number, number, number];
  texture: THREE.Texture;
  tornMask: THREE.Texture;
  artwork: GalleryArtworkMeta;
  theme: GalleryThemeMode;
  onSelect: (art: GalleryArtworkMeta) => void;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const map = useMemo(() => {
    const t = texture.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [texture]);

  const groupRef = useCardMotion(basePosition, hovered);
  const { w, h, pad } = cardDims(artwork, map);
  const paperColor = theme === "light" ? "#e8e8ea" : "#1a1a1a";

  return (
    <group
      ref={groupRef}
      position={basePosition}
      onClick={(e) => { e.stopPropagation(); onSelect(artwork); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[w * pad, h * pad]} />
        <meshBasicMaterial
          color={paperColor}
          alphaMap={tornMask}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          map={map}
          alphaMap={tornMask}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      {hovered ? <HoverRing w={w} h={h} /> : null}
    </group>
  );
}

// ---------------------------------------------------------------------------
// VideoArtCard — self-contained; calls useVideoTexture internally.
// Must be a separate component so the hook is called at component level (not
// in a conditional or loop).
// ---------------------------------------------------------------------------
function VideoArtCard({
  basePosition,
  src,
  tornMask,
  artwork,
  theme,
  onSelect,
}: {
  basePosition: [number, number, number];
  src: string;
  tornMask: THREE.Texture;
  artwork: GalleryArtworkMeta;
  theme: GalleryThemeMode;
  onSelect: (art: GalleryArtworkMeta) => void;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const videoTex = useVideoTexture(src, {
    muted: true,
    loop: true,
    start: true,
    crossOrigin: "anonymous",
  });

  // Ensure correct colour space for unlit pipeline
  videoTex.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useCardMotion(basePosition, hovered);
  const { w, h, pad } = cardDims(artwork, videoTex);
  const paperColor = theme === "light" ? "#e8e8ea" : "#1a1a1a";

  return (
    <group
      ref={groupRef}
      position={basePosition}
      onClick={(e) => { e.stopPropagation(); onSelect(artwork); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[w * pad, h * pad]} />
        <meshBasicMaterial
          color={paperColor}
          alphaMap={tornMask}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          map={videoTex}
          alphaMap={tornMask}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      {hovered ? <HoverRing w={w} h={h} /> : null}
    </group>
  );
}

// ---------------------------------------------------------------------------
// GallerySpheres
// Batch-loads only image textures; dispatches VideoArtCard for .mp4 sources.
// ---------------------------------------------------------------------------
function GallerySpheres({
  theme,
  onArtworkOpen,
}: {
  theme: GalleryThemeMode;
  onArtworkOpen: (art: GalleryArtworkMeta) => void;
}) {
  // Only image URLs go into the batch pre-loader
  const textures = useTexture(GALLERY_IMAGE_URLS);
  const tornSrc = useTexture(TORN_MASK_URL);

  const tornMask = useMemo(() => {
    const m = tornSrc.clone();
    m.wrapS = THREE.ClampToEdgeWrapping;
    m.wrapT = THREE.ClampToEdgeWrapping;
    m.flipY = true;
    m.colorSpace = THREE.NoColorSpace;
    m.needsUpdate = true;
    return m;
  }, [tornSrc]);

  // Build a stable src → texture lookup so array ordering doesn't matter
  const texByUrl = useMemo(() => {
    const list = Array.isArray(textures) ? textures : [textures];
    const map = new Map<string, THREE.Texture>();
    GALLERY_IMAGE_URLS.forEach((url, i) => {
      if (list[i]) map.set(url, list[i]);
    });
    return map;
  }, [textures]);

  return (
    <>
      {/* Zero lights — MeshBasicMaterial; colour fidelity is 100% */}
      {POSITIONS.map((pos, i) => {
        const artwork = getGalleryArtworkByIndex(i);

        if (isVideoSrc(artwork.src)) {
          return (
            <VideoArtCard
              key={`${artwork.id}-${i}`}
              basePosition={pos}
              src={artwork.src}
              tornMask={tornMask}
              artwork={artwork}
              theme={theme}
              onSelect={onArtworkOpen}
            />
          );
        }

        // Fall back to image texture (cycle through available images)
        const imageArtworks = galleryArtworks.filter((a) => !isVideoSrc(a.src));
        const imgArtwork = imageArtworks[i % imageArtworks.length]!;
        const tex = texByUrl.get(imgArtwork.src);
        if (!tex) return null;

        return (
          <ArtCard
            key={`${artwork.id}-${i}`}
            basePosition={pos}
            texture={tex}
            tornMask={tornMask}
            artwork={artwork}
            theme={theme}
            onSelect={onArtworkOpen}
          />
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// GalleryCanvas — exported default
// ---------------------------------------------------------------------------
export default function GalleryCanvas({
  theme,
  onArtworkOpen,
}: GalleryCanvasProps) {
  const bg = SCENE_BG[theme];

  return (
    <div
      className={`fixed inset-0 z-[1] h-dvh w-full touch-none ${
        theme === "light" ? "bg-[#eaeaea]" : "bg-[#000000]"
      }`}
    >
      <Canvas
        className="h-full w-full touch-none"
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 80 }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
          toneMappingExposure: 1,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <color attach="background" args={[bg]} />
          <GallerySpheres theme={theme} onArtworkOpen={onArtworkOpen} />
        </Suspense>
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.055}
          enableZoom
          zoomToCursor
          enablePan={false}
          enableRotate
          minDistance={3.2}
          maxDistance={24}
          rotateSpeed={0.52}
          zoomSpeed={0.8}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
