import type { CSSProperties } from "react";
import type { Photo } from "../../data/aboutPhotos";

type PhotoMarqueeProps = {
  images: Photo[];
  direction?: "left" | "right";
};

// Each loop must be wider than the widest screen, or the row runs out and photos vanish.
// 10 tiles is ~2800px on mobile tiles and ~3400px on desktop tiles.
const MIN_TILES_PER_LOOP = 10;

export default function PhotoMarquee({ images, direction = "left" }: PhotoMarqueeProps) {
  if (images.length === 0) return null;

  // Repeat the photos until one loop is wide enough, then render that loop twice
  // so the -50% translate wraps seamlessly
  const repeats = Math.ceil(MIN_TILES_PER_LOOP / images.length);
  const loop = Array.from({ length: repeats }, () => images).flat();
  const track = loop.concat(loop);

  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track flex w-max"
        style={
          {
            // Duration scales with tile count, so speed (px/s) stays constant (see globals.css)
            "--marquee-tiles": loop.length,
            animationDirection: direction === "right" ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        {track.map((photo, idx) => (
          <div
            key={idx}
            className="mr-6 w-64 shrink-0 overflow-hidden rounded-3xl bg-white shadow-sm sm:w-80"
            style={{ aspectRatio: "16/10" }}
            aria-hidden={idx >= images.length}
          >
            <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
