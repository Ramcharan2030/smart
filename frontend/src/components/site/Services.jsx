import { motion } from "framer-motion";
import {
    Phone,
    MessageCircle,
    Calendar,
    Headset,
    Megaphone,
    BarChart3,
} from "lucide-react";

const SERVICES = [
    {
        icon: Phone,
        title: "AI Voice Agent",
        desc: "24/7 automated calling that books appointments, follows up on leads, and never sleeps.",
        bullets: [
            "Hindi · English · Tamil · Telugu",
            "Books straight into your calendar",
        ],
    },
    {
        icon: MessageCircle,
        title: "WhatsApp Automation Bot",
        desc: "Instant replies, order updates, reminders, and complete two-way conversations on WhatsApp.",
        bullets: ["Official WA Business API", "Rich media + buttons + flows"],
    },
    {
        icon: Calendar,
        title: "Smart Appointment Booking",
        desc: "Automated confirmations and reminders to slash your no-show rate by up to 60%.",
        bullets: ["1-tap rescheduling", "Calendar + CRM sync"],
    },
    {
        icon: Headset,
        title: "AI Customer Support",
        desc: "Handles FAQs, complaints, and queries — without a single staff member breaking a sweat.",
        bullets: ["Trained on your business", "Live agent handover"],
    },
    {
        icon: Megaphone,
        title: "Lead Follow-up Bot",
        desc: "Nurture and convert your leads automatically with multi-touch, intent-aware sequences.",
        bullets: ["Drip across SMS + WA + Voice", "Score intent in real time"],
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        desc: "See every interaction, conversion, and rupee of ROI in one beautifully simple dashboard.",
        bullets: ["Live conversation stream", "Funnels + cohorts + exports"],
    },
];

export default function Services() {
    return (
        <section
            id="services"
            data-testid="services-section"
            className="relative py-24 md:py-32"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-14 md:mb-20">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#6C5CE7] mb-4">
                        Our AI Solutions
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-[#0A0A1A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.02]">
                        Six building blocks.
                        <br />
                        <span className="text-[#6C5CE7]">
                            One unstoppable business.
                        </span>
                    </h2>
                    <p className="mt-5 text-[#4A4A5A] text-base sm:text-lg leading-relaxed">
                        Each AutoSolutions module is production-grade and works
                        beautifully on its own — combine them and your business
                        runs itself.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((s, i) => (
                        <motion.article
                            key={s.title}
                            initial={{ opacity: 0, y: 40, rotateX: -18 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.08,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            style={{ transformPerspective: 1000 }}
                            className="group relative rounded-2xl p-7 as-glass hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(108,92,231,0.15)] transition-all duration-300"
                            data-testid={`service-card-${i}`}
                        >
                            {/* Icon block */}
                            <div className="relative mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#6C5CE7] text-white shadow-[0_8px_24px_rgba(108,92,231,0.4)]">
                                <s.icon size={20} strokeWidth={2} />
                                <span className="absolute -inset-1 rounded-xl bg-[#6C5CE7] opacity-20 blur-md -z-10" />
                            </div>
                            <h3 className="font-bold text-xl tracking-tight text-[#0A0A1A] mb-3">
                                {s.title}
                            </h3>
                            <p className="text-[#4A4A5A] text-[15px] leading-relaxed">
                                {s.desc}
                            </p>
                            <ul className="mt-5 space-y-2">
                                {s.bullets.map((b) => (
                                    <li
                                        key={b}
                                        className="flex items-center gap-2 text-sm text-[#0A0A1A]/80"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#6C5CE7]" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            {/* Decorative number */}
                            <span
                                aria-hidden
                                className="absolute top-5 right-6 text-[12px] font-mono font-semibold text-[#8A8A9A]/40"
                            >
                                0{i + 1}
                            </span>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
