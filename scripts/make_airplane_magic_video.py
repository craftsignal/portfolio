#!/usr/bin/env python3
"""
Build a vertical slideshow (1080x1920) from 8 airplane “magic” frames.

Each image is shown for 2 seconds (peak), with a 1-second crossfade to the next.
Outputs:
  - public/gallery/airplane_magic.mp4
  - public/gallery/airplane_magic_poster.jpg  (first frame, for fallbacks / OG)

Usage:
  pip install -r scripts/requirements-video.txt
  # Copy the 8 PNGs into public/gallery/airplane_frames/ (see FRAME_FILENAMES below)
  # Or set AIRPLANE_MAGIC_INPUT to the folder that already contains them.
  python scripts/make_airplane_magic_video.py

Input filenames in public/gallery/airplane_frames/ (same order as original 8 frames;
  JPG or PNG — currently shipped as short-name JPGs):
  1. 1AfNA.jpg   2. C20hn.jpg   3. cO8fz.jpg   4. KldLT.jpg
  5. MB616.jpg   6. eF2bR.jpg   7. pCqU3.jpg   8. 5FsnF.jpg
Alternative long PNG names still work if you drop them in the same folder (see FRAME_FILENAMES in source).
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

FRAME_FILENAMES = [
    "1AfNA.jpg",
    "C20hn.jpg",
    "cO8fz.jpg",
    "KldLT.jpg",
    "MB616.jpg",
    "eF2bR.jpg",
    "pCqU3.jpg",
    "5FsnF.jpg",
]

W, H = 1080, 1920
DISPLAY_S = 2.0
XFADE_S = 1.0
FPS = 30
OUT_NAME = "airplane_magic.mp4"
POSTER_NAME = "airplane_magic_poster.jpg"


def resolve_portfolio_root() -> Path:
    return Path(__file__).resolve().parent.parent


def resolve_input_dir(root: Path) -> Path:
    env = os.environ.get("AIRPLANE_MAGIC_INPUT")
    if env:
        return Path(env).expanduser().resolve()
    # Cursor asset drop (if present on this machine)
    cursor_assets = (
        Path.home()
        / ".cursor/projects/Users-tians-my-portfolio/assets"
    )
    bundled = root / "public" / "gallery" / "airplane_frames"
    if bundled.is_dir() and all((bundled / n).is_file() for n in FRAME_FILENAMES):
        return bundled
    if cursor_assets.is_dir() and all((cursor_assets / n).is_file() for n in FRAME_FILENAMES):
        return cursor_assets
    return bundled


def collect_frame_paths(input_dir: Path) -> list[Path]:
    missing = [n for n in FRAME_FILENAMES if not (input_dir / n).is_file()]
    if missing:
        print("Missing images in:", input_dir, file=sys.stderr)
        for m in missing:
            print(f"  - {m}", file=sys.stderr)
        print(
            "\nCopy the 8 PNGs into:",
            input_dir,
            "\nOr set AIRPLANE_MAGIC_INPUT=/path/to/folder containing those files",
            file=sys.stderr,
        )
        sys.exit(1)
    return [input_dir / n for n in FRAME_FILENAMES]


def fit_image_clip(clip, target_w: int, target_h: int):
    """Cover-crop to target_w x target_h (portrait frame)."""
    from moviepy.editor import ImageClip  # noqa: F401 — dependency check

    cw, ch = clip.size
    scale = max(target_w / cw, target_h / ch)
    nw, nh = int(round(cw * scale)), int(round(ch * scale))
    clip = clip.resize(newsize=(nw, nh))
    x1 = max(0, (nw - target_w) // 2)
    y1 = max(0, (nh - target_h) // 2)
    return clip.crop(x1=x1, y1=y1, width=target_w, height=target_h)


def main() -> None:
    try:
        from moviepy.editor import CompositeVideoClip, ImageClip
    except ImportError as e:
        print("Install dependencies: pip install -r scripts/requirements-video.txt", file=sys.stderr)
        raise e

    root = resolve_portfolio_root()
    out_dir = root / "public" / "gallery"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_mp4 = out_dir / OUT_NAME
    out_poster = out_dir / POSTER_NAME

    input_dir = resolve_input_dir(root)
    paths = collect_frame_paths(input_dir)

    n = len(paths)
    clips = []
    step = DISPLAY_S  # start time between clip i and i+1

    for i, path in enumerate(paths):
        base = fit_image_clip(ImageClip(str(path)), W, H)
        if n == 1:
            seg = base.set_duration(DISPLAY_S)
        elif i == 0:
            seg = base.set_duration(DISPLAY_S + XFADE_S).fadeout(XFADE_S)
        elif i == n - 1:
            seg = base.set_duration(XFADE_S + DISPLAY_S).fadein(XFADE_S)
        else:
            seg = base.set_duration(XFADE_S + DISPLAY_S + XFADE_S).fadein(XFADE_S).fadeout(
                XFADE_S
            )
        seg = seg.set_start(i * step)
        clips.append(seg)

    final = CompositeVideoClip(clips, size=(W, H))
    final.write_videofile(
        str(out_mp4),
        fps=FPS,
        codec="libx264",
        audio=False,
        preset="medium",
        ffmpeg_params=["-pix_fmt", "yuv420p"],
    )

    # Poster: JPEG cannot store RGBA from MoviePy composite; strip alpha.
    poster_t = min(0.1, DISPLAY_S / 2)
    arr = np.asarray(final.get_frame(poster_t))
    if arr.ndim == 3 and arr.shape[2] == 4:
        arr = arr[:, :, :3]
    Image.fromarray(arr).save(str(out_poster), "JPEG", quality=92)
    final.close()

    print("Wrote:", out_mp4)
    print("Wrote:", out_poster)


if __name__ == "__main__":
    main()
