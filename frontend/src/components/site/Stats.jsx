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
        <span className="font-extrabold tracking-tighter text-[#0A0A1A] text-5xl sm:text-6xl">
            {stat.format(val)}
            <span className="text-[#6C5CE7]">{stat.suffix}</span>
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
            className="relative py-24 md:py-32 bg-[#F7F7F8]"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-14">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#6C5CE7] mb-4">
                        Numbers don't lie
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-[#0A0A1A] text-4xl sm:text-5xl leading-[1.04]">
                        The kind of growth you can{" "}
                        <span className="text-[#6C5CE7]">measure.</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className="bg-white rounded-2xl p-7 md:p-9 border border-black/5"
                            data-testid={`stat-${i}`}
                        >
                            <div className="flex items-baseline">
                                <Counter
                                    stat={s}
                                    active={active}
                                    delay={i * 120}
                                />
                            </div>
                            <p className="mt-2 text-sm text-[#4A4A5A] font-medium">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
