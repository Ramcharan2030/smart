import { Stethoscope, Hospital, Pill, Coffee, Utensils, ShoppingBag, Building2, Scissors, GraduationCap, Activity, Wrench, Dumbbell } from "lucide-react";

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
    Clinic: Stethoscope,
    Hospital: Hospital,
    Pharmacy: Pill,
    Cafe: Coffee,
    Restaurant: Utensils,
    "Retail Store": ShoppingBag,
    "Real Estate": Building2,
    "Salon & Spa": Scissors,
    Education: GraduationCap,
    "Dental Practice": Activity,
    "Auto Service": Wrench,
    "Gym & Fitness": Dumbbell,
};

export default function SocialProofTicker() {
    const repeated = [...ITEMS, ...ITEMS];
    return (
        <section
            data-testid="social-proof-ticker"
            className="relative py-12 md:py-16 border-y border-white/[0.04] bg-[#0b1120]/40"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 mb-6 flex items-end justify-between flex-wrap gap-3">
                <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)]">
                    Trusted across industries
                </p>
                <p className="text-sm text-white/50">
                    From single-location cafes to multi-city hospital chains.
                </p>
            </div>
            <div className="relative">
                {/* edge fades */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent z-10"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050816] via-[#050816]/80 to-transparent z-10"
                />
                <div className="overflow-hidden">
                    <div className="flex gap-4 w-max as-marquee">
                        {repeated.map((label, i) => {
                            const IconComponent = ICONS[label];
                            return (
                                <div
                                    key={`${label}-${i}`}
                                    className="shrink-0 inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-[rgba(var(--as-violet-rgb),0.3)] hover:bg-white/[0.04] transition-all duration-300 text-white font-semibold text-sm shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                                >
                                    {IconComponent && <IconComponent size={16} className="text-[var(--as-violet)]" />}
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
