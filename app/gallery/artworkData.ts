/**
 * Child gallery artwork — replace `src` files in /public/assets/artwork/ with real scans/photos.
 */
export type GalleryArtworkMeta = {
  id: string;
  title: string;
  src: string;
};

export const galleryArtworks: readonly GalleryArtworkMeta[] = [
  { id: "aw-01", title: "Drawing 01", src: "/gallery/draw-01.mp4" },
  { id: "aw-02", title: "Drawing 02", src: "/gallery/draw-02.mp4" },
  { id: "aw-03", title: "Drawing 03", src: "/gallery/draw-03.mp4" },
  { id: "aw-04", title: "Artwork 04", src: "/assets/artwork/04.jpg" },
  { id: "aw-05", title: "Artwork 05", src: "/assets/artwork/05.jpg" },
  { id: "aw-06", title: "Artwork 06", src: "/assets/artwork/06.jpg" },
  { id: "aw-07", title: "Artwork 07", src: "/assets/artwork/07.jpg" },
  { id: "aw-08", title: "Artwork 08", src: "/assets/artwork/08.jpg" },
  { id: "aw-09", title: "Artwork 09", src: "/assets/artwork/09.svg" },
  { id: "aw-10", title: "Artwork 10", src: "/assets/artwork/10.svg" },
  { id: "aw-11", title: "Artwork 11", src: "/assets/artwork/11.svg" },
  { id: "aw-12", title: "Artwork 12", src: "/assets/artwork/12.svg" },
] as const;

/** True for .mp4 / .webm sources. */
export function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

/** URLs of image-only artworks (used for batch texture pre-loading). */
export const GALLERY_IMAGE_URLS = galleryArtworks
  .filter((a) => !isVideoSrc(a.src))
  .map((a) => a.src) as string[];

/** @deprecated — use GALLERY_IMAGE_URLS for image batch loading */
export const GALLERY_ARTWORK_URLS = galleryArtworks.map((a) => a.src) as unknown as readonly string[];

export function getGalleryArtworkByIndex(index: number): GalleryArtworkMeta {
  const n = galleryArtworks.length;
  return galleryArtworks[((index % n) + n) % n]!;
}
