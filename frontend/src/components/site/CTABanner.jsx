import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function CTABanner() {
    const scrollToContact = () => {
        const el = document.querySelector("#contact");
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
        else el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            data-testid="cta-banner"
            className="relative py-16 md:py-20 px-6"
        >
            <div className="relative max-w-7xl mx-auto rounded-[32px] overflow-hidden border border-white/[0.08] bg-black/[0.3] backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                {/* deep bg with grain */}
                <div
                    className="absolute inset-0 bg-[#0B1120] opacity-90"
                    aria-hidden
                />
                <div
                    className="absolute inset-0 opacity-[0.25] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
                    }}
                    aria-hidden
                />
                {/* glow blobs */}
                <div
                    className="as-blob"
                    style={{
                        width: 500,
                        height: 500,
                        background: "var(--as-violet)",
                        top: -200,
                        right: -100,
                        opacity: 0.15,
                        filter: "blur(130px)",
                    }}
                />
                <div
                    className="as-blob"
                    style={{
                        width: 400,
                        height: 400,
                        background: "#38bdf8",
                        bottom: -150,
                        left: -100,
                        opacity: 0.1,
                        filter: "blur(130px)",
                    }}
                />
 
                <div className="relative px-8 sm:px-12 md:px-20 py-16 md:py-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="font-extrabold tracking-tighter text-white font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04]"
                    >
                        Deploy your first AI Operator in 24 hours.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-5 text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
                    >
                        Turn your business into an AI-first autonomous enterprise. Reduce operational drag, automate calls & messaging pipelines, and scale while you sleep.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-9"
                    >
                        <MagneticButton
                            onClick={scrollToContact}
                            data-testid="cta-banner-book-btn"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--as-violet)] text-white font-semibold shadow-[0_0_32px_rgba(var(--as-violet-rgb),0.35)] hover:bg-[var(--as-violet-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                        >
                            <span className="inline-flex items-center gap-2">
                                Deploy Your Workforce
                                <ArrowRight size={18} />
                            </span>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
