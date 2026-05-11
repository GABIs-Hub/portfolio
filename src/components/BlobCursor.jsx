import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const BlobCursor = ({
  blobType = "circle",
  fillColor = "#24f0c9",
  trailCount = 6,
  sizes = [60, 50, 40, 30, 20, 10],
  innerSizes = [30, 25, 20, 15, 10, 5],
  innerColor = "rgba(255,255,255,0.6)",
  opacities = [0.95, 0.8, 0.65, 0.5, 0.35, 0.2],
  shadowColor = "rgba(36,240,201,0.5)",
  shadowBlur = 15,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  filterStdDeviation = 15,
  useFilter = true,
  fastDuration = 0.08,
  slowDuration = 0.35,
  fastEase = "power4.out",
  slowEase = "power2.out",
  zIndex = 100,
}) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const blobs = gsap.utils.toArray(".blob-cursor-blob");

    gsap.set(blobs, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      blobs.forEach((blob, i) => {
        const isFirst = i === 0;
        gsap.to(blob, {
          x: e.clientX,
          y: e.clientY,
          duration: isFirst ? fastDuration : slowDuration,
          ease: isFirst ? fastEase : slowEase,
          delay: i * 0.025,
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [fastDuration, slowDuration, fastEase, slowEase]);

  const borderRadius = blobType === "circle" ? "50%" : "8px";

  if (isMobile) {
    return null;
  }

  return (
    <>
      {useFilter && (
        <svg
          style={{ position: "fixed", width: 0, height: 0, top: 0, left: 0, pointerEvents: "none" }}
        >
          <defs>
            <filter id="blob-goo-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation={filterStdDeviation} result="blur" />
              <feColorMatrix
                in="blur"
                mode="saturate"
                values="1.3"
                result="saturated"
              />
              <feColorMatrix
                in="saturated"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}

      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex,
          filter: useFilter ? "url(#blob-goo-filter)" : "none",
        }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div key={i} style={{ position: "fixed", top: 0, left: 0 }}>
            <div
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
                boxShadow: `0 0 ${shadowBlur}px ${shadowColor}, inset 0 0 ${shadowBlur / 2}px rgba(255,255,255,0.3)`,
                willChange: "transform",
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius,
                  backgroundColor: innerColor,
                  width: innerSizes[i] ?? innerSizes[innerSizes.length - 1],
                  height: innerSizes[i] ?? innerSizes[innerSizes.length - 1],
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0.8,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlobCursor;