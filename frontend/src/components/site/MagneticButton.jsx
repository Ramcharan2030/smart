import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Magnetic button that gently pulls toward cursor on hover.
 * Renders a <button> by default; pass `as="a"` for anchor.
 */
export default function MagneticButton({
    as: Tag = "button",
    children,
    className = "",
    onClick,
    href,
    type = "button",
    strength = 22,
    "data-testid": testId,
    ...rest
}) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
    const tx = useTransform(sx, (v) => v);
    const ty = useTransform(sy, (v) => v);

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    const props = {
        ref,
        onMouseMove: handleMove,
        onMouseLeave: reset,
        onClick,
        className,
        "data-testid": testId,
        style: { x: tx, y: ty },
        ...rest,
    };
    if (Tag === "a") {
        return (
            <motion.a href={href} {...props}>
                <span className="block">{children}</span>
            </motion.a>
        );
    }
    return (
        <motion.button type={type} {...props}>
            <span className="block">{children}</span>
        </motion.button>
    );
}
