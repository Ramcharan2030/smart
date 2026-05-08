import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
    {
        quote: "Our clinic stopped missing 30% of patient calls — AutoSolutions fixed it overnight. The voice agent sounds incredibly natural in Hindi and English, and our front desk finally has time to focus on actual patients.",
        name: "Dr. Priya Mehta",
        role: "Founder",
        company: "Sunshine Clinic, Pune",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    },
    {
        quote: "We run 4 cafes in Bangalore. Reservations on WhatsApp now happen automatically — even at 2 AM. ROI was clear in the first 3 weeks. The team genuinely cares about your business outcomes.",
        name: "Karan Shetty",
        role: "Co-founder",
        company: "Brewline Cafes",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
        quote: "The lead follow-up bot alone has converted 38% more site-visit bookings for us. Our agents love it because it does the boring stuff so they can close deals. Honestly, this is the future of real estate ops in India.",
        name: "Ananya Reddy",
        role: "Sales Director",
        company: "Vista Realty Group",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
];

export default function Testimonials() {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(
            () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
            6000,
        );
        return () => clearInterval(id);
    }, [paused]);

    const t = TESTIMONIALS[idx];

    return (
        <section
            data-testid="testimonials-section"
            className="relative py-24 md:py-32"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-12 md:mb-14">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#6C5CE7] mb-4">
                        What our clients say
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-[#0A0A1A] text-4xl sm:text-5xl leading-[1.04]">
                        Real businesses.{" "}
                        <span className="text-[#6C5CE7]">Real results.</span>
                    </h2>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center as-glass rounded-3xl p-8 md:p-12"
                            data-testid="testimonial-card"
                        >
                            <Quote
                                className="absolute -top-4 left-8 text-[#6C5CE7]/15"
                                size={80}
                            />
                            <div className="md:col-span-3 flex md:block items-center gap-5">
                                <img
                                    src={t.photo}
                                    alt={t.name}
                                    loading="lazy"
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-white shadow-[0_8px_28px_rgba(10,10,26,0.08)]"
                                />
                                <div className="md:mt-5">
                                    <p className="font-bold text-[#0A0A1A]">
                                        {t.name}
                                    </p>
                                    <p className="text-sm text-[#4A4A5A]">
                                        {t.role}
                                    </p>
                                    <p className="text-xs text-[#8A8A9A] mt-0.5">
                                        {t.company}
                                    </p>
                                    <div className="flex gap-1 mt-2">
                                        {Array.from({ length: t.rating }).map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className="fill-[#6C5CE7] text-[#6C5CE7]"
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-9">
                                <p className="text-xl md:text-2xl leading-relaxed font-medium text-[#0A0A1A] tracking-tight">
                                    “{t.quote}”
                                </p>
                            </div>
                        </motion.article>
                    </AnimatePresence>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                aria-label={`Show testimonial ${i + 1}`}
                                data-testid={`testimonial-dot-${i}`}
                                className={`h-2 rounded-full transition-all ${
                                    idx === i
                                        ? "w-8 bg-[#6C5CE7]"
                                        : "w-2 bg-[#0A0A1A]/15 hover:bg-[#0A0A1A]/30"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
