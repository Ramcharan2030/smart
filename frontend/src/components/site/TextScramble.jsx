import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#________";

/**
 * Text scramble / glitch reveal animation.
 * Re-runs when `text` changes or on mount.
 */
export default function TextScramble({
    text,
    className = "",
    duration = 1100,
    delay = 0,
    "data-testid": testId,
}) {
    const [output, setOutput] = useState(text);
    const frameRef = useRef(0);
    const rafRef = useRef(null);

    useEffect(() => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduce) {
            setOutput(text);
            return;
        }

        let queue = [];
        const old = output;
        const length = Math.max(old.length, text.length);
        for (let i = 0; i < length; i++) {
            const from = old[i] || "";
            const to = text[i] || "";
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40) + 18;
            queue.push({ from, to, start, end, char: "" });
        }

        let frame = 0;
        const totalFrames = Math.round((duration / 1000) * 60);

        const update = () => {
            let complete = 0;
            let out = "";
            for (let i = 0; i < queue.length; i++) {
                let { from, to, start, end, char } = queue[i];
                if (frame >= end) {
                    complete++;
                    out += to;
                } else if (frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = CHARS[Math.floor(Math.random() * CHARS.length)];
                        queue[i].char = char;
                    }
                    out += `<span style="color:#F97316;opacity:.85">${char}</span>`;
                } else {
                    out += from;
                }
            }
            setOutput(out);
            frame++;
            if (complete < queue.length && frame < totalFrames + 20) {
                rafRef.current = requestAnimationFrame(update);
            } else {
                setOutput(text);
            }
        };

        const t = setTimeout(() => {
            rafRef.current = requestAnimationFrame(update);
        }, delay);

        return () => {
            clearTimeout(t);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    return (
        <span
            className={className}
            data-testid={testId}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: output }}
        />
    );
}
