import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

const TIERS = [
    {
        id: "starter",
        name: "Starter",
        description: "For solo clinics, cafes, and small stores ready to automate the basics.",
        monthly: 4999,
        yearly: 47990, // ~20% off
        features: [
            "WhatsApp automation (1 number)",
            "AI chatbot — up to 1,000 conversations/mo",
            "Smart appointment booking",
            "Basic analytics dashboard",
            "Email support (24h response)",
        ],
        cta: "Get Started",
    },
    {
        id: "growth",
        name: "Growth",
        description: "For growing multi-staff businesses that want voice + WhatsApp + lead engine.",
        monthly: 14999,
        yearly: 143990,
        popular: true,
        features: [
            "Everything in Starter",
            "AI Voice Agent (500 mins/mo)",
            "Lead follow-up bot (multi-touch)",
            "CRM + Calendar + POS integration",
            "Hindi · English · Tamil · Telugu",
            "Priority chat support (4h response)",
        ],
        cta: "Start 14-day Trial",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For chains, hospitals, and large operations that need scale + custom workflows.",
        monthly: 39999,
        yearly: 383990,
        features: [
            "Everything in Growth",
            "Unlimited voice & WhatsApp volume",
            "Multi-location + multi-team setup",
            "Custom integrations & APIs",
            "Dedicated success manager",
            "99.99% uptime SLA",
        ],
        cta: "Talk to Sales",
    },
];

const fmtINR = (n) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n);

export default function Pricing() {
    const [yearly, setYearly] = useState(false);

    const scrollToContact = () => {
        const el = document.querySelector("#contact");
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
        else el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="pricing"
            data-testid="pricing-section"
            className="relative py-24 md:py-32"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#6C5CE7] mb-4">
                        Simple, transparent pricing
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-[#0A0A1A] text-4xl sm:text-5xl leading-[1.04]">
                        Pick a plan that <span className="text-[#6C5CE7]">grows with you.</span>
                    </h2>
                    <p className="mt-5 text-[#4A4A5A] text-base sm:text-lg">
                        No setup fees. Cancel anytime. Switch plans on the fly.
                    </p>

                    {/* Toggle */}
                    <div
                        className="mt-8 inline-flex items-center gap-1 p-1 rounded-full border border-black/10 bg-white"
                        role="tablist"
                        aria-label="Billing frequency"
                    >
                        <button
                            data-testid="pricing-toggle-monthly"
                            onClick={() => setYearly(false)}
                            className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                                !yearly
                                    ? "bg-[#0A0A1A] text-white"
                                    : "text-[#4A4A5A] hover:text-[#0A0A1A]"
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            data-testid="pricing-toggle-yearly"
                            onClick={() => setYearly(true)}
                            className={`px-5 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-2 ${
                                yearly
                                    ? "bg-[#0A0A1A] text-white"
                                    : "text-[#4A4A5A] hover:text-[#0A0A1A]"
                            }`}
                        >
                            Yearly
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6C5CE7]/15 text-[#6C5CE7]">
                                SAVE 20%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TIERS.map((t, i) => {
                        const price = yearly ? t.yearly / 12 : t.monthly;
                        return (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                className={`relative rounded-3xl p-8 ${
                                    t.popular
                                        ? "bg-white border-2 border-[#6C5CE7] shadow-[0_24px_60px_rgba(108,92,231,0.2)] md:-translate-y-3"
                                        : "bg-white border border-black/5"
                                }`}
                                data-testid={`pricing-card-${t.id}`}
                            >
                                {t.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#6C5CE7] text-white text-[11px] font-bold tracking-wider uppercase shadow-[0_8px_20px_rgba(108,92,231,0.45)]">
                                        <Sparkles size={12} /> Most popular
                                    </div>
                                )}

                                <h3 className="font-bold text-2xl tracking-tight text-[#0A0A1A]">
                                    {t.name}
                                </h3>
                                <p className="mt-2 text-sm text-[#4A4A5A] leading-relaxed">
                                    {t.description}
                                </p>

                                <div className="mt-7 flex items-baseline gap-1">
                                    <span className="font-extrabold tracking-tighter text-[#0A0A1A] text-5xl">
                                        {fmtINR(price)}
                                    </span>
                                    <span className="text-sm text-[#8A8A9A]">
                                        /mo
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-[#8A8A9A]">
                                    {yearly
                                        ? `Billed annually as ${fmtINR(t.yearly)}`
                                        : "Billed monthly"}
                                </p>

                                <MagneticButton
                                    onClick={scrollToContact}
                                    data-testid={`pricing-cta-${t.id}`}
                                    className={`mt-7 w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-semibold transition-all ${
                                        t.popular
                                            ? "bg-[#6C5CE7] text-white shadow-[0_8px_24px_rgba(108,92,231,0.45)] hover:bg-[#5A4BD1]"
                                            : "bg-[#0A0A1A] text-white hover:bg-[#0A0A1A]/90"
                                    }`}
                                >
                                    {t.cta}
                                </MagneticButton>

                                <ul className="mt-7 space-y-3.5">
                                    {t.features.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start gap-3 text-sm text-[#0A0A1A]/85"
                                        >
                                            <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#6C5CE7]/12 text-[#6C5CE7]">
                                                <Check size={12} strokeWidth={3} />
                                            </span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                <p className="mt-10 text-center text-xs text-[#8A8A9A]">
                    Prices in INR. GST extra as applicable. Need a custom plan?{" "}
                    <button
                        onClick={scrollToContact}
                        className="text-[#6C5CE7] font-semibold underline-offset-2 hover:underline"
                        data-testid="pricing-custom-link"
                    >
                        Contact us →
                    </button>
                </p>
            </div>
        </section>
    );
}
