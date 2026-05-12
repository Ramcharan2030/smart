import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import HeroOrb from "./HeroOrb";
import MagneticButton from "./MagneticButton";
import TextScramble from "./TextScramble";

export default function Hero() {
    const scrollTo = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
        else el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            data-testid="hero-section"
            className="relative min-h-[100svh] pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden"
        >
            {/* Background layers */}
            <div className="absolute inset-0 as-hero-radial" aria-hidden />
            <div
                className="absolute inset-0 as-dot-grid opacity-60"
                aria-hidden
            />
            <div
                className="as-blob"
                style={{
                    width: 480,
                    height: 480,
                    background: "rgba(108, 92, 231, 0.35)",
                    top: -100,
                    right: -120,
                }}
            />
            <div
                className="as-blob"
                style={{
                    width: 360,
                    height: 360,
                    background: "rgba(108, 92, 231, 0.2)",
                    bottom: -120,
                    left: -80,
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-center">
                {/* Left content */}
                <div className="lg:col-span-7">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full as-glass text-[12px] font-semibold text-as-ink-soft mb-7"
                        data-testid="hero-trust-badge"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--as-violet)] opacity-75 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--as-violet)]" />
                        </span>
                        Trusted by 500+ Businesses Across India
                        <span className="ml-1">🇮🇳</span>
                    </motion.div>

                    {/* Headline */}
                    <h1
                        className="font-extrabold tracking-tighter text-as-ink leading-[0.96]"
                        style={{
                            fontSize: "clamp(2.6rem, 6.4vw, 5.4rem)",
                        }}
                    >
                        <TextScramble
                            text="We Automate."
                            duration={1100}
                            data-testid="hero-headline-1"
                        />
                        <br />
                        <span className="bg-gradient-to-r from-as-violet via-as-violet to-as-ink bg-clip-text text-transparent">
                            <TextScramble
                                text="You Grow."
                                duration={1300}
                                delay={350}
                                data-testid="hero-headline-2"
                            />
                        </span>
                    </h1>

                    {/* Sub */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="mt-6 text-as-ink-soft text-base sm:text-lg leading-relaxed max-w-2xl"
                        data-testid="hero-subheadline"
                    >
                        AI Voice Agents, WhatsApp Bots & Smart Automation —
                        purpose-built for Clinics, Cafes, Hospitals, Retail and
                        more. Save staff hours, capture every lead, and run on
                        autopilot 24/7.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <MagneticButton
                            onClick={() => scrollTo("#contact")}
                            data-testid="hero-get-started-btn"
                            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-as-violet text-white font-semibold shadow-[0_8px_28px_rgba(108,92,231,0.45)] hover:bg-as-violet-hover transition-colors"
                        >
                            <span className="inline-flex items-center gap-2">
                                Get Started Free
                                <ArrowRight size={18} />
                            </span>
                        </MagneticButton>
                        <MagneticButton
                            onClick={() => scrollTo("#demo")}
                            data-testid="hero-watch-demo-btn"
                            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-as-bg text-as-ink border border-as-border font-semibold hover:bg-as-border transition-colors"
                        >
                            <span className="inline-flex items-center gap-2">
                                <Play size={16} className="text-[var(--as-violet)]" />
                                Watch Demo
                            </span>
                        </MagneticButton>
                    </motion.div>

                    {/* mini stats row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="mt-12 flex flex-wrap items-center gap-7 text-xs text-as-ink-muted"
                    >
                        {[
                            "ISO-grade infra",
                            "Hindi · English · Tamil · Telugu",
                            "WhatsApp Business API verified",
                            "GDPR / DPDP compliant",
                        ].map((c) => (
                            <span
                                key={c}
                                className="inline-flex items-center gap-2"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--as-violet)]" />
                                {c}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Right 3D orb */}
                <div className="lg:col-span-5 relative">
                    <div
                        className="relative mx-auto aspect-square w-full max-w-[520px] as-float"
                        style={{ height: "min(60vh, 520px)" }}
                    >
                        <HeroOrb />
                        {/* Floating tags around orb */}
                        <FloatingPill
                            label="AI Voice Agent"
                            icon={<Sparkles size={12} />}
                            style={{ top: "8%", left: "-4%" }}
                            delay={1.2}
                        />
                        <FloatingPill
                            label="WhatsApp Bot"
                            icon={<span>💬</span>}
                            style={{ top: "62%", left: "-8%" }}
                            delay={1.4}
                        />
                        <FloatingPill
                            label="Lead Follow-up"
                            icon={<span>📈</span>}
                            style={{ top: "12%", right: "-6%" }}
                            delay={1.6}
                        />
                        <FloatingPill
                            label="Auto Booking"
                            icon={<span>📅</span>}
                            style={{ bottom: "8%", right: "-4%" }}
                            delay={1.8}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function FloatingPill({ label, icon, style, delay = 1 }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className="absolute as-glass px-3 py-1.5 rounded-full text-[12px] font-semibold text-as-ink flex items-center gap-1.5 shadow-[0_8px_24px_rgba(10,10,26,0.06)]"
            style={style}
        >
            <span className="text-[var(--as-violet)]">{icon}</span>
            {label}
        </motion.div>
    );
}
