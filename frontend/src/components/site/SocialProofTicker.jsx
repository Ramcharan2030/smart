const ITEMS = [
    "Clinic",
    "Hospital",
    "Pharmacy",
    "Cafe",
    "Restaurant",
    "Retail Store",
    "Real Estate",
    "Salon & Spa",
    "Education",
    "Dental Practice",
    "Auto Service",
    "Gym & Fitness",
];

const ICONS = {
    Clinic: "🩺",
    Hospital: "🏥",
    Pharmacy: "💊",
    Cafe: "☕",
    Restaurant: "🍽️",
    "Retail Store": "🛍️",
    "Real Estate": "🏠",
    "Salon & Spa": "💇",
    Education: "🎓",
    "Dental Practice": "🦷",
    "Auto Service": "🔧",
    "Gym & Fitness": "💪",
};

export default function SocialProofTicker() {
    const repeated = [...ITEMS, ...ITEMS];
    return (
        <section
            data-testid="social-proof-ticker"
            className="relative py-12 md:py-16 border-y border-as-border bg-[var(--as-bg-soft)]/60"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 mb-6 flex items-end justify-between flex-wrap gap-3">
                <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)]">
                    Trusted across industries
                </p>
                <p className="text-sm text-[var(--as-ink-muted)]">
                    From single-location cafes to multi-city hospital chains.
                </p>
            </div>
            <div className="relative">
                {/* edge fades */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-as-bg via-as-bg/80 to-transparent z-10"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-as-bg via-as-bg/80 to-transparent z-10"
                />
                <div className="overflow-hidden">
                    <div className="flex gap-4 w-max as-marquee">
                        {repeated.map((label, i) => (
                            <div
                                key={`${label}-${i}`}
                                className="shrink-0 inline-flex items-center gap-3 px-6 py-3 rounded-full as-glass text-[var(--as-ink)] font-semibold text-sm"
                            >
                                <span className="text-lg">{ICONS[label]}</span>
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
