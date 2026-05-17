import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, MessageSquare, TrendingUp, Calendar } from "lucide-react";
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
            <div className="absolute inset-0 bg-[#050816]" aria-hidden />
            <div className="absolute inset-0 as-hero-radial z-0" aria-hidden />
            <div className="absolute inset-0 as-dot-grid opacity-40 z-0" aria-hidden />
            <div className="as-noise-overlay" aria-hidden />
            
            {/* Premium Animated Aurora Glow Blobs */}
            <div
                className="as-blob as-aurora-glow-1"
                style={{
                    width: 600,
                    height: 600,
                    background: "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%)",
                    top: -150,
                    right: -150,
                }}
                aria-hidden
            />
            <div
                className="as-blob as-aurora-glow-2"
                style={{
                    width: 500,
                    height: 500,
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 60%)",
                    bottom: -150,
                    left: -100,
                }}
                aria-hidden
            />

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-center z-10">
                {/* Left content */}
                <div className="lg:col-span-7">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full as-glass text-[12px] font-semibold text-white/70 mb-7"
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
                        className="font-extrabold tracking-tighter text-white leading-[0.9] font-display"
                        style={{
                            fontSize: "clamp(3.6rem, 7.8vw, 7.2rem)",
                            letterSpacing: "-0.05em",
                        }}
                    >
                        <TextScramble
                            text="Your AI Workforce."
                            duration={1100}
                            data-testid="hero-headline-1"
                        />
                        <br />
                        <span className="bg-gradient-to-r from-[var(--as-violet)] via-[#a855f7] to-white bg-clip-text text-transparent">
                            <TextScramble
                                text="Running 24/7."
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
                        className="mt-6 text-white/60 text-base sm:text-lg leading-[1.8] max-w-2xl font-sans"
                        data-testid="hero-subheadline"
                    >
                        Deploy autonomous AI employees that operate across calls,
                        WhatsApp, scheduling, and customer workflows.
                    </motion.p>
 
                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <MagneticButton
                            onClick={() => scrollTo("#demo")}
                            data-testid="hero-watch-demo-btn"
                            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[var(--as-violet)] text-white font-semibold shadow-[0_0_32px_rgba(var(--as-violet-rgb),0.35)] hover:bg-[var(--as-violet-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                        >
                            <span className="inline-flex items-center gap-2">
                                <Play size={16} className="text-white" />
                                See AI In Action
                            </span>
                        </MagneticButton>
                        <MagneticButton
                            onClick={() => scrollTo("#contact")}
                            data-testid="hero-get-started-btn"
                            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.02] text-white border border-white/[0.08] font-semibold hover:bg-white/[0.06] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                        >
                            <span className="inline-flex items-center gap-2">
                                Deploy Your Workforce
                                <ArrowRight size={18} className="text-[var(--as-violet)]" />
                            </span>
                        </MagneticButton>
                    </motion.div>

                    {/* mini stats row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="mt-12 flex flex-wrap items-center gap-7 text-xs text-white/40 font-sans"
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
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--as-violet)] shadow-[0_0_8px_var(--as-violet)]" />
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
                            icon={<Sparkles size={13} />}
                            style={{ top: "8%", left: "-4%" }}
                            delay={1.2}
                        />
                        <FloatingPill
                            label="WhatsApp Bot"
                            icon={<MessageSquare size={13} />}
                            style={{ top: "62%", left: "-8%" }}
                            delay={1.4}
                        />
                        <FloatingPill
                            label="Lead Follow-up"
                            icon={<TrendingUp size={13} />}
                            style={{ top: "12%", right: "-6%" }}
                            delay={1.6}
                        />
                        <FloatingPill
                            label="Auto Booking"
                            icon={<Calendar size={13} />}
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
            className="absolute bg-white/[0.03] backdrop-blur-xl px-4 py-2.5 rounded-full text-[12px] font-semibold text-white flex items-center gap-2 shadow-[0_12px_32px_rgba(0,0,0,0.5)] border border-white/[0.08] hover:border-[rgba(var(--as-violet-rgb),0.5)] hover:shadow-[0_0_20px_rgba(var(--as-violet-rgb),0.2)] transition-all duration-300 pointer-events-auto"
            style={style}
        >
            <span className="text-[var(--as-violet)] flex items-center">{icon}</span>
            {label}
        </motion.div>
    );
}
