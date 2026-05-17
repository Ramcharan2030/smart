import { motion } from "framer-motion";
import { Search, Cog, Rocket } from "lucide-react";

const STEPS = [
    {
        n: "01",
        icon: Search,
        title: "We Understand Your Business",
        desc: "A 30-min discovery call. We map your customer journey, common queries, peak hours, and pain points — then we draft your AI workflow.",
    },
    {
        n: "02",
        icon: Cog,
        title: "We Build & Deploy Your AI",
        desc: "Our team trains the bots on your business, integrates with your existing tools (calendar, POS, CRM, WhatsApp), and goes live in days.",
    },
    {
        n: "03",
        icon: Rocket,
        title: "You Sit Back & Watch It Grow",
        desc: "Your AI handles calls, books appointments, replies on WhatsApp, and follows up on leads — 24/7. You get a clean dashboard to track ROI.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how"
            data-testid="how-it-works"
            className="relative py-24 md:py-32 bg-[#0b1120] border-t border-b border-white/[0.04]"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-14 md:mb-20">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4">
                        How it works
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-white font-display text-4xl sm:text-5xl leading-[1.04]">
                        From first call to fully automated —{" "}
                        <span className="bg-gradient-to-r from-[var(--as-violet)] to-[#38bdf8] bg-clip-text text-transparent">in under 2 weeks.</span>
                    </h2>
                </div>
 
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Connecting line - desktop */}
                    <motion.div
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{ transformOrigin: "left center" }}
                        className="hidden md:block absolute top-[88px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[var(--as-violet)]/40 to-transparent"
                    />
                    {STEPS.map((s, i) => (
                        <motion.div
                            key={s.n}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.12,
                                ease: "easeOut",
                            }}
                            className="relative bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 border border-white/[0.08] hover:-translate-y-1 hover:border-white/[0.12] transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
                            data-testid={`how-step-${i + 1}`}
                        >
                            <span
                                aria-hidden
                                className="absolute -top-4 right-6 text-[64px] font-extrabold tracking-tighter text-white/[0.03] select-none leading-none"
                            >
                                {s.n}
                            </span>
                            <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--as-violet)] text-white shadow-[0_0_24px_rgba(var(--as-violet-rgb),0.4)] mb-6">
                                <s.icon size={22} strokeWidth={2} />
                            </div>
                            <h3 className="font-bold text-xl tracking-tight text-white font-display mb-3">
                                {s.title}
                            </h3>
                            <p className="text-white/60 text-[15px] leading-relaxed">
                                {s.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
