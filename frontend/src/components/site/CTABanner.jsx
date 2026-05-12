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
            <div className="relative max-w-7xl mx-auto rounded-[32px] overflow-hidden">
                {/* gradient bg with grain */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(120deg, var(--as-violet) 0%, var(--as-violet-hover) 60%, #4737B0 100%)",
                    }}
                    aria-hidden
                />
                <div
                    className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
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
                        width: 380,
                        height: 380,
                        background: "rgba(255,255,255,0.4)",
                        top: -120,
                        right: -80,
                        opacity: 0.35,
                    }}
                />
                <div
                    className="as-blob"
                    style={{
                        width: 320,
                        height: 320,
                        background: "rgba(255,255,255,0.4)",
                        bottom: -100,
                        left: -60,
                        opacity: 0.25,
                    }}
                />

                <div className="relative px-8 sm:px-12 md:px-20 py-16 md:py-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="font-extrabold tracking-tighter text-white text-4xl sm:text-5xl md:text-6xl leading-[1.04]"
                    >
                        Ready to put your business on autopilot?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-5 text-white/85 text-base sm:text-lg max-w-2xl mx-auto"
                    >
                        Join 500+ businesses already using AutoSolutions.in to
                        capture more leads, reduce no-shows, and grow on
                        autopilot — 24/7.
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
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-as-bg text-[var(--as-ink)] font-semibold shadow-[0_18px_50px_rgba(0,0,0,0.18)] hover:bg-as-bg/95 transition-colors"
                        >
                            <span className="inline-flex items-center gap-2">
                                Book Your Free Demo Call
                                <ArrowRight size={18} />
                            </span>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
