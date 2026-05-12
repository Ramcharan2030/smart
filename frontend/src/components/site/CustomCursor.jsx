import { useEffect, useRef, useState } from "react";

/**
 * Custom glowing dot cursor with fading trail.
 * Auto-disabled on touch devices and when prefers-reduced-motion.
 */
export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const isFinePointer =
            window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (!isFinePointer || reduce) return;

        setEnabled(true);
        document.body.classList.add("as-custom-cursor");

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;
        let rafId;

        const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        };

        const onOver = (e) => {
            const t = e.target;
            if (
                t.closest(
                    "a, button, [role=button], input, textarea, select, [data-cursor-hover]",
                )
            ) {
                ring.classList.add("as-cursor-active");
            }
        };
        const onOut = () => ring.classList.remove("as-cursor-active");

        const tick = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        window.addEventListener("mouseout", onOut);
        return () => {
            cancelAnimationFrame(rafId);
            document.body.classList.remove("as-custom-cursor");
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            window.removeEventListener("mouseout", onOut);
        };
    }, []);

    if (!enabled) return null;
    return (
        <>
            <div
                ref={dotRef}
                aria-hidden
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--as-violet)",
                    boxShadow: "0 0 16px 4px rgba(108, 92, 231, 0.55)",
                    pointerEvents: "none",
                    zIndex: 9998,
                    mixBlendMode: "normal",
                    willChange: "transform",
                }}
            />
            <div
                ref={ringRef}
                aria-hidden
                className="as-cursor-ring"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(108, 92, 231, 0.55)",
                    pointerEvents: "none",
                    zIndex: 9997,
                    transition:
                        "width 220ms ease, height 220ms ease, border-color 220ms ease, background 220ms ease",
                    willChange: "transform",
                }}
            />
            <style>{`
        .as-cursor-ring.as-cursor-active {
          width: 56px;
          height: 56px;
          border-color: rgba(108, 92, 231, 0.85);
          background: rgba(108, 92, 231, 0.08);
        }
      `}</style>
        </>
    );
}
