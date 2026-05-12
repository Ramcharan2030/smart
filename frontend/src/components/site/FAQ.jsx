import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

const FAQS = [
    {
        q: "Do I need any technical knowledge to use this?",
        a: "Not at all. We handle the entire setup — integrations, training, and deployment. You'll get a clean dashboard to manage and review conversations, and our team is just one message away.",
    },
    {
        q: "How long does it take to set up?",
        a: "Most clinics, cafes, and retail stores go live in 5–10 business days. Larger hospitals or chains with custom integrations typically take 2–3 weeks.",
    },
    {
        q: "Can this really work for a small cafe or single-doctor clinic?",
        a: "Yes — that's exactly who our Starter plan was built for. You'll see ROI within the first month from missed-call recovery and after-hours bookings alone.",
    },
    {
        q: "Do you offer a free trial or demo?",
        a: "Yes. Book a free 30-minute demo — we'll walk you through a live AI agent built around a sample of your business and show you the dashboard.",
    },
    {
        q: "Is it available in regional Indian languages?",
        a: "Hindi, English, Tamil, Telugu, Marathi, Bengali, Kannada, Gujarati, and Malayalam are supported on voice and WhatsApp. More languages on request.",
    },
    {
        q: "What happens if the bot doesn't know an answer?",
        a: "It politely captures the customer's request, escalates to your team in real time (WhatsApp / dashboard), and learns from the conversation for next time.",
    },
];

export default function FAQ() {
    return (
        <section
            data-testid="faq-section"
            className="relative py-24 md:py-32 bg-[#F7F7F8]"
        >
            <div className="max-w-4xl mx-auto px-6 md:px-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4">
                        Frequently asked
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-[var(--as-ink)] text-4xl sm:text-5xl leading-[1.04]">
                        Got questions?{" "}
                        <span className="text-[var(--as-violet)]">We've got you.</span>
                    </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                    {FAQS.map((f, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="rounded-2xl bg-as-bg border border-as-border px-5 md:px-6 data-[state=open]:shadow-[0_12px_40px_rgba(108,92,231,0.08)] transition-all"
                            data-testid={`faq-item-${i}`}
                        >
                            <AccordionTrigger className="py-5 text-left text-[15px] md:text-base font-semibold text-[var(--as-ink)] hover:no-underline">
                                {f.q}
                            </AccordionTrigger>
                            <AccordionContent className="pb-5 text-[15px] text-[var(--as-ink-soft)] leading-relaxed">
                                {f.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
