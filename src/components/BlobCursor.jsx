import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BlobCursor = ({
  blobType = "circle",        // shape: "circle" or "square"
  fillColor = "#9c27b0",      // color of all blobs
  trailCount = 3,             // how many blobs trail behind
  sizes = [60, 45, 30],       // pixel size of each blob
  opacities = [0.6, 0.5, 0.4],// opacity of each blob
  shadowColor = "#9c27b0",
  shadowBlur = 10,
  shadowOffsetX = 0,
  shadowOffsetY = 10,
  filterId = "blob-filter",   // unique ID — important for multiple instances
  enableFilter = true,        // turn the goo filter on/off
  fastDuration = 0.1,         // how fast the lead blob follows cursor
  slowDuration = 0.4,         // how fast trailing blobs follow
  fastEase = "power3.out",
  slowEase = "power2.out",
  zIndex = 9999,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const blobs = gsap.utils.toArray(".blob-cursor-blob");

    // Center each blob on cursor (without this they'd anchor top-left)
    gsap.set(blobs, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: e.clientX,
          y: e.clientY,
          duration: i === 0 ? fastDuration : slowDuration,
          ease: i === 0 ? fastEase : slowEase,
          // Each trailing blob is slightly more delayed
          delay: i * 0.02,
          overwrite: "auto", // prevent animation pile-up
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [fastDuration, slowDuration, fastEase, slowEase]);

  const borderRadius = blobType === "circle" ? "50%" : "10%";

  return (
    <>
      {/* The SVG goo filter — invisible, but does all the merging magic */}
      {enableFilter && (
        <svg
          style={{ position: "fixed", width: 0, height: 0, top: 0, left: 0 }}
        >
          <defs>
            <filter id={filterId}>
              {/* Step 1: Blur the blobs */}
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              {/* Step 2: Boost contrast — this is what makes edges "snap" together */}
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
                result="goo"
              />
              {/* Step 3: Re-apply original on top for sharpness */}
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Wrapper applies the filter to ALL blobs inside it */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none", // ← CRUCIAL: don't block clicks
          zIndex,
          filter: enableFilter ? `url(#${filterId})` : "none",
        }}
      >
        {/* Render each blob */}
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            className="blob-cursor-blob"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: sizes[i] ?? sizes[sizes.length - 1],
              height: sizes[i] ?? sizes[sizes.length - 1],
              borderRadius,
              backgroundColor: fillColor,
              opacity: opacities[i] ?? opacities[opacities.length - 1],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`,
              willChange: "transform", // GPU hint for smooth animation
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BlobCursor;