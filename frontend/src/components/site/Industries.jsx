import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
    HeartPulse,
    Hospital as HospitalIcon,
    Pill,
    Coffee,
    UtensilsCrossed,
    ShoppingBag,
    Building2,
    Scissors,
    GraduationCap,
} from "lucide-react";

const ITEMS = [
    {
        icon: HeartPulse,
        title: "Clinics",
        desc: "Patient calls handled. Appointments booked. Reminders sent.",
    },
    {
        icon: HospitalIcon,
        title: "Hospitals",
        desc: "Department routing, OPD bookings, emergency triage flows.",
    },
    {
        icon: Pill,
        title: "Pharmacies",
        desc: "Prescription refills, stock queries, WhatsApp ordering.",
    },
    {
        icon: Coffee,
        title: "Cafes & Restaurants",
        desc: "Reservations, menu queries, takeaway orders 24/7.",
    },
    {
        icon: ShoppingBag,
        title: "Retail Stores",
        desc: "Order tracking, returns, product Q&A on WhatsApp.",
    },
    {
        icon: Building2,
        title: "Real Estate",
        desc: "Auto-qualify leads, schedule site visits, share brochures.",
    },
    {
        icon: Scissors,
        title: "Salons & Spas",
        desc: "Booking, stylist preferences, retention follow-ups.",
    },
    {
        icon: GraduationCap,
        title: "Educational Institutes",
        desc: "Admissions queries, fee reminders, parent-teacher comms.",
    },
    {
        icon: UtensilsCrossed,
        title: "Cloud Kitchens",
        desc: "Multi-platform order coordination & delivery updates.",
    },
];

export default function Industries() {
    return (
        <section
            id="industries"
            data-testid="industries-section"
            className="relative py-24 md:py-32"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-14 md:mb-20">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4">
                        Industries we serve
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-white font-display text-4xl sm:text-5xl leading-[1.04]">
                        Built for the businesses that{" "}
                        <span className="bg-gradient-to-r from-[var(--as-violet)] to-[#a855f7] bg-clip-text text-transparent">power India.</span>
                    </h2>
                </div>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {ITEMS.map((it, i) => (
                        <motion.div
                            key={it.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.55, delay: i * 0.06 }}
                        >
                            <Tilt
                                glareEnable
                                glareMaxOpacity={0.12}
                                glareColor="var(--as-violet)"
                                glarePosition="all"
                                glareBorderRadius="20px"
                                scale={1.02}
                                tiltMaxAngleX={6}
                                tiltMaxAngleY={6}
                                transitionSpeed={1200}
                             >
                                <div
                                    className="relative h-full rounded-2xl p-7 bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] hover:border-[var(--as-violet)]/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] transition-all duration-300"
                                    data-testid={`industry-card-${i}`}
                                >
                                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-black/[0.2] text-[var(--as-violet)] border border-[var(--as-violet)]/30 mb-5">
                                        <it.icon size={20} strokeWidth={2} />
                                    </div>
                                    <h3 className="font-bold text-lg tracking-tight text-white font-display mb-2">
                                        {it.title}
                                    </h3>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        {it.desc}
                                    </p>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
