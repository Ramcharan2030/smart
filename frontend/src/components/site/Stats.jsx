import { useEffect, useRef, useState } from "react";

const STATS = [
    {
        value: 500,
        suffix: "+",
        label: "Businesses Automated",
        format: (n) => Math.round(n).toLocaleString("en-IN"),
    },
    {
        value: 10,
        suffix: "M+",
        label: "Messages Sent",
        format: (n) => n.toFixed(0),
    },
    {
        value: 98,
        suffix: "%",
        label: "Client Satisfaction",
        format: (n) => Math.round(n),
    },
    {
        value: 24,
        suffix: "/7",
        label: "Uptime Guaranteed",
        format: (n) => Math.round(n),
    },
];

function Counter({ stat, active, delay = 0 }) {
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!active) return;
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduce) {
            setVal(stat.value);
            return;
        }
        let raf;
        const start = performance.now() + delay;
        const dur = 1600;
        const tick = (t) => {
            if (t < start) {
                raf = requestAnimationFrame(tick);
                return;
            }
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(stat.value * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, stat.value, delay]);

    return (
        <span className="font-extrabold tracking-tighter text-white font-display text-5xl sm:text-6xl">
            {stat.format(val)}
            <span className="text-[var(--as-violet)]">{stat.suffix}</span>
        </span>
    );
}

export default function Stats() {
    const ref = useRef(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setActive(true);
                        obs.disconnect();
                    }
                });
            },
            { threshold: 0.3 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            data-testid="stats-section"
            className="relative py-24 md:py-32 bg-[#0b1120] border-t border-b border-white/[0.04]"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-14">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4">
                        Numbers don't lie
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-white font-display text-4xl sm:text-5xl leading-[1.04]">
                        The kind of growth you can{" "}
                        <span className="bg-gradient-to-r from-[var(--as-violet)] to-[#38bdf8] bg-clip-text text-transparent">measure.</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-7 md:p-9 border border-white/[0.08] hover:-translate-y-1 hover:border-white/[0.12] transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
                            data-testid={`stat-${i}`}
                        >
                            <div className="flex items-baseline">
                                <Counter
                                    stat={s}
                                    active={active}
                                    delay={i * 120}
                                />
                            </div>
                            <p className="mt-2 text-sm text-white/60 font-medium">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
