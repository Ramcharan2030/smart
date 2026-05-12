import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MessageCircle, Phone, Mail, Loader2, Check } from "lucide-react";
import MagneticButton from "./MagneticButton";

const BUSINESS_TYPES = [
    "Clinic",
    "Hospital",
    "Pharmacy",
    "Cafe / Restaurant",
    "Retail Store",
    "Real Estate",
    "Salon / Spa",
    "Educational Institute",
    "Other",
];

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        business_type: BUSINESS_TYPES[0],
        phone: "",
        email: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const onChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!form.name.trim() || !form.phone.trim()) {
            setError("Please fill in your name and phone number.");
            return;
        }
        setSubmitting(true);
        try {
            const payload = { ...form };
            if (!payload.email) delete payload.email;
            const { error: supabaseError } = await supabase.from("leads").insert([payload]);
            if (supabaseError) throw supabaseError;
            
            setSuccess("Thanks! We'll be in touch shortly.");
            setForm({
                name: "",
                business_type: BUSINESS_TYPES[0],
                phone: "",
                email: "",
                message: "",
            });
        } catch (err) {
            console.error("Supabase insert error:", err);
            const msg = err?.message || "Something went wrong. Please try again or WhatsApp us.";
            setError(typeof msg === "string" ? msg : "Submission failed.");
        } finally {
            setSubmitting(false);
        }
    };

    const getWhatsAppUrl = () => {
        const phone = "917989831473";
        let message = "Hi AutoSolutions! I'm interested in your AI automation services.";
        
        if (form.name.trim() || form.business_type) {
            message = `Hi AutoSolutions! My name is ${form.name.trim() || "[Name]"}${form.business_type ? ` and I run a ${form.business_type}` : ""}. I'm interested in your AI automation services.`;
            if (form.message.trim()) {
                message += `\n\nContext: ${form.message.trim()}`;
            }
        }
        
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    const getCalendlyUrl = () => {
        // NOTE: User should replace this with their actual Calendly link
        const baseUrl = "https://calendly.com/demo"; 
        const params = new URLSearchParams();
        if (form.name.trim()) params.append("name", form.name.trim());
        if (form.email.trim()) params.append("email", form.email.trim());
        
        const queryString = params.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    };

    return (
        <section
            id="contact"
            data-testid="contact-section"
            className="relative py-24 md:py-32"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-as-violet mb-4">
                        Let's talk
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-as-ink text-4xl sm:text-5xl leading-[1.04]">
                        Book a free, no-pressure demo for your business.
                    </h2>
                    <p className="mt-5 text-as-ink-soft text-base sm:text-lg leading-relaxed">
                        30 minutes. We'll show you a live AI agent built around
                        your exact use case — and give you a clear ROI estimate.
                    </p>

                    {/* Calendly placeholder */}
                    <a
                        href={getCalendlyUrl()}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="calendly-cta"
                        className="mt-8 group flex items-center gap-4 p-5 rounded-2xl bg-as-bg border border-as-border hover:border-as-violet/30 hover:shadow-[0_18px_50px_rgba(108,92,231,0.12)] transition-all"
                    >
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-as-violet text-white shadow-[0_8px_24px_rgba(108,92,231,0.4)]">
                            <Calendar size={20} />
                        </span>
                        <div className="flex-1">
                            <p className="font-bold text-as-ink">
                                Book on Calendly
                            </p>
                            <p className="text-sm text-as-ink-soft">
                                Pick a slot that suits you →
                            </p>
                        </div>
                    </a>

                    {/* WhatsApp CTA */}
                    <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="whatsapp-cta"
                        className="mt-4 group flex items-center gap-4 p-5 rounded-2xl bg-[#10B981] text-white hover:bg-[#0D9668] transition-colors shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
                    >
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-as-bg/15">
                            <MessageCircle size={20} />
                        </span>
                        <div className="flex-1">
                            <p className="font-bold">Chat with us on WhatsApp</p>
                            <p className="text-sm text-white/80">
                                Average reply time: under 4 minutes
                            </p>
                        </div>
                    </a>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-as-ink-soft">
                        <a
                            href="tel:+917989831473"
                            className="inline-flex items-center gap-2 hover:text-as-ink"
                        >
                            <Phone size={14} className="text-[var(--as-violet)]" /> +91
                            79898 31473
                        </a>
                        <a
                            href="mailto:autosolutions297@gmail.com"
                            className="inline-flex items-center gap-2 hover:text-as-ink"
                        >
                            <Mail size={14} className="text-[var(--as-violet)]" />{" "}
                            autosolutions297@gmail.com
                        </a>
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-7">
                    <form
                        onSubmit={onSubmit}
                        data-testid="contact-form"
                        className="rounded-3xl p-8 md:p-10 bg-as-bg border border-as-border shadow-[0_24px_70px_rgba(10,10,26,0.05)]"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field
                                label="Your name"
                                name="name"
                                value={form.name}
                                onChange={onChange}
                                placeholder="e.g. Riya Sharma"
                                testId="contact-input-name"
                                required
                            />
                            <Field
                                label="Phone (WhatsApp)"
                                name="phone"
                                value={form.phone}
                                onChange={onChange}
                                placeholder="+91 9XXXXXXXXX"
                                testId="contact-input-phone"
                                required
                            />
                            <div className="md:col-span-1">
                                <label className="block text-xs tracking-[0.18em] uppercase font-bold text-[var(--as-violet)] mb-2">
                                    Business Type
                                </label>
                                <select
                                    name="business_type"
                                    value={form.business_type}
                                    onChange={onChange}
                                    data-testid="contact-input-business-type"
                                    className="w-full rounded-xl border border-as-border bg-as-bg px-4 py-3 text-[15px] text-as-ink focus:outline-none focus:ring-2 focus:ring-as-violet/40 focus:border-as-violet"
                                >
                                    {BUSINESS_TYPES.map((b) => (
                                        <option key={b} value={b}>
                                            {b}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Field
                                label="Email (optional)"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={onChange}
                                placeholder="you@business.in"
                                testId="contact-input-email"
                            />
                            <div className="md:col-span-2">
                                <label className="block text-xs tracking-[0.18em] uppercase font-bold text-[var(--as-violet)] mb-2">
                                    What do you want to automate?
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={onChange}
                                    rows={4}
                                    placeholder="e.g. We miss too many patient calls after 8pm — want a voice agent that books appointments."
                                    data-testid="contact-input-message"
                                    className="w-full rounded-xl border border-as-border bg-as-bg px-4 py-3 text-[15px] text-as-ink focus:outline-none focus:ring-2 focus:ring-as-violet/40 focus:border-as-violet resize-y"
                                />
                            </div>
                        </div>

                        {error && (
                            <div
                                className="mt-5 px-4 py-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100"
                                data-testid="contact-form-error"
                            >
                                {error}
                            </div>
                        )}
                        {success && (
                            <div
                                className="mt-5 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-800 text-sm border border-emerald-100 flex items-center gap-2"
                                data-testid="contact-form-success"
                            >
                                <Check
                                    size={16}
                                    className="text-emerald-600"
                                />
                                {success}
                            </div>
                        )}

                        <div className="mt-7 flex items-center justify-between gap-4 flex-wrap">
                            <p className="text-xs text-as-ink-muted">
                                We respond within 24 hours. By submitting you
                                agree to our privacy policy.
                            </p>
                            <MagneticButton
                                type="submit"
                                onClick={() => {}}
                                data-testid="contact-form-submit"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-as-violet text-white font-semibold shadow-[0_10px_28px_rgba(108,92,231,0.45)] hover:bg-as-violet-hover transition-colors disabled:opacity-60"
                                disabled={submitting}
                            >
                                <span className="inline-flex items-center gap-2">
                                    {submitting && (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    )}
                                    {submitting
                                        ? "Sending…"
                                        : "Book My Free Demo"}
                                </span>
                            </MagneticButton>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

function Field({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required,
    testId,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-xs tracking-[0.18em] uppercase font-bold text-as-violet mb-2"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                data-testid={testId}
                className="w-full rounded-xl border border-as-border bg-as-bg px-4 py-3 text-[15px] text-as-ink placeholder:text-as-ink-muted focus:outline-none focus:ring-2 focus:ring-as-violet/40 focus:border-as-violet"
            />
        </div>
    );
}
