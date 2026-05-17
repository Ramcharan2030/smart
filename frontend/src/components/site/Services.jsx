import { motion } from "framer-motion";
import {
    Phone,
    MessageCircle,
    Calendar,
    Zap,
    Globe,
    TrendingUp,
} from "lucide-react";

const SERVICES = [
    {
        icon: Phone,
        title: "AI Voice Receptionist",
        desc: "Answers inbound calls, schedules appointments, answers FAQs, and transfers live in human-like conversational voice.",
        bullets: [
            "Hindi, English & regional accents",
            "Books slots in your calendar in real-time",
        ],
    },
    {
        icon: MessageCircle,
        title: "24/7 WhatsApp Operator",
        desc: "Qualifies cold leads instantly, replies to questions, dispatches reminders, and dispatches direct payment links.",
        bullets: [
            "Official WhatsApp API verified",
            "Interactive buttons + flows",
        ],
    },
    {
        icon: Zap,
        title: "Autonomous Operations",
        desc: "Synchronizes appointment bookings, spreadsheets, internal CRMs, and alert workflows on complete autopilot.",
        bullets: [
            "Google Sheets + custom CRM sync",
            "Zero human action required",
        ],
    },
    {
        icon: Calendar,
        title: "Smart Booking Coordinator",
        desc: "Verifies slot availability dynamically in real time, locking appointments and cutting no-shows by up to 60%.",
        bullets: [
            "Real-time database verification",
            "1-tap rescheduling triggers",
        ],
    },
    {
        icon: Globe,
        title: "Multilingual Speech Layer",
        desc: "Operates seamlessly in Hindi, English, Tamil, Telugu, and Kannada with native accents and local grammar.",
        bullets: [
            "Human-like conversational pacing",
            "Intent & emotion-aware speech",
        ],
    },
    {
        icon: TrendingUp,
        title: "Lead Nurturing Sequences",
        desc: "Fires multi-touch drip flows across Voice, WhatsApp, and SMS to recover cold prospects and double conversions.",
        bullets: [
            "Predictive follow-up timing",
            "Intent-aware text triggers",
        ],
    },
];

export default function Services() {
    return (
        <section
            id="services"
            data-testid="services-section"
            className="relative py-32 md:py-40"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-14 md:mb-20">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4">
                        Capabilities
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-white font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.02]">
                        What Your
                        <br />
                        <span className="bg-gradient-to-r from-[var(--as-violet)] to-[#38bdf8] bg-clip-text text-transparent">
                            AI Employee Can Do.
                        </span>
                    </h2>
                    <p className="mt-5 text-white/60 text-base sm:text-lg leading-relaxed">
                        We don't build generic chatbots. We deploy autonomous operational systems that act as highly-capable digital team members, active 24/7.
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
                            className="group relative rounded-2xl p-7 bg-white/[0.02] border border-white/[0.08] hover:-translate-y-2 hover:border-[rgba(var(--as-violet-rgb),0.3)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-500"
                            data-testid={`service-card-${i}`}
                        >
                            {/* Icon block */}
                            <div className="relative mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.08] text-[var(--as-violet)] shadow-[0_0_20px_rgba(var(--as-violet-rgb),0.1)] group-hover:bg-[var(--as-violet)] group-hover:text-white group-hover:shadow-[0_0_24px_rgba(var(--as-violet-rgb),0.35)] transition-all duration-500">
                                <s.icon size={20} strokeWidth={2} />
                            </div>
                            <h3 className="font-bold text-xl tracking-tight text-white mb-3 font-display">
                                {s.title}
                            </h3>
                            <p className="text-white/60 text-[15px] leading-relaxed">
                                {s.desc}
                            </p>
                            <ul className="mt-5 space-y-2">
                                {s.bullets.map((b) => (
                                    <li
                                        key={b}
                                        className="flex items-center gap-2 text-sm text-white/80"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--as-violet)] shadow-[0_0_6px_var(--as-violet)]" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            {/* Decorative number */}
                            <span
                                aria-hidden
                                className="absolute top-5 right-6 text-[12px] font-mono font-semibold text-white/20"
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
