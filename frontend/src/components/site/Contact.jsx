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

const WORKFLOW_OPTIONS = [
    "Inbound Call Scheduling & FAQs",
    "WhatsApp Lead Qualification & Reminders",
    "Omnichannel Lead Nurturing & Outbound Follow-up",
    "Custom Enterprise Systems Orchestration",
];

const CONVERSATION_VOLUMES = [
    "Under 50 conversations / day",
    "50 to 200 conversations / day",
    "200 to 1,000 conversations / day",
    "1,000+ conversations / day",
];

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        business_type: BUSINESS_TYPES[0],
        phone: "",
        email: "",
        workflow: WORKFLOW_OPTIONS[0],
        conversations: CONVERSATION_VOLUMES[0],
        platforms: "",
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
            const combinedMessage = `Automate Target: ${form.workflow}\nDaily Volume: ${form.conversations}\nPlatforms: ${form.platforms || "None specified"}`;
            const payload = {
                name: form.name,
                business_type: form.business_type,
                phone: form.phone,
                email: form.email || null,
                message: combinedMessage,
            };
            
            const { error: supabaseError } = await supabase.from("leads").insert([payload]);
            if (supabaseError) throw supabaseError;
            
            setSuccess("Diagnostic dispatched. Our systems engineers will reach out with your flow design.");
            setForm({
                name: "",
                business_type: BUSINESS_TYPES[0],
                phone: "",
                email: "",
                workflow: WORKFLOW_OPTIONS[0],
                conversations: CONVERSATION_VOLUMES[0],
                platforms: "",
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
        const phoneNum = "917989831473";
        const message = `Hi AutoSolutions! I run a ${form.business_type} and want to deploy an autonomous AI employee.\n\nWorkflow: ${form.workflow}\nVolume: ${form.conversations}`;
        return `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
    };

    const getCalendlyUrl = () => {
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
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4">
                        Operations Diagnostic
                    </p>
                    <h2 className="font-extrabold tracking-tighter text-white font-display text-4xl sm:text-5xl leading-[1.04]">
                        Deploy your autonomous AI workforce.
                    </h2>
                    <p className="mt-5 text-white/60 text-base sm:text-lg leading-relaxed">
                        Experience AI operations live. Provide your metrics and our systems engineers will design a custom active agent flow built around your daily workflow.
                    </p>
 
                    {/* Calendly CTA */}
                    <a
                        href={getCalendlyUrl()}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="calendly-cta"
                        className="mt-8 group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[var(--as-violet)] hover:shadow-[0_0_32px_rgba(var(--as-violet-rgb),0.1)] transition-all duration-300 shadow-sm"
                    >
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--as-violet)] text-white shadow-[0_0_20px_rgba(var(--as-violet-rgb),0.35)]">
                            <Calendar size={20} />
                        </span>
                        <div className="flex-1">
                            <p className="font-bold text-white">
                                Schedule System Diagnostics
                            </p>
                            <p className="text-sm text-white/50">
                                Secure your implementation slot →
                            </p>
                        </div>
                    </a>
 
                    {/* WhatsApp CTA */}
                    <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="whatsapp-cta"
                        className="mt-4 group flex items-center gap-4 p-5 rounded-2xl bg-[#10B981] text-white hover:bg-[#0D9668] transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                    >
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10">
                            <MessageCircle size={20} />
                        </span>
                        <div className="flex-1">
                            <p className="font-bold">Chat with Systems Engineers</p>
                            <p className="text-sm text-white/80">
                                Average response time: under 4 minutes
                            </p>
                        </div>
                    </a>
 
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/60">
                        <a
                            href="tel:+917989831473"
                            className="inline-flex items-center gap-2 hover:text-white transition-colors"
                        >
                            <Phone size={14} className="text-[var(--as-violet)]" /> +91
                            79898 31473
                        </a>
                        <a
                            href="mailto:autosolutions297@gmail.com"
                            className="inline-flex items-center gap-2 hover:text-white transition-colors"
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
                        className="rounded-3xl p-8 md:p-10 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.5)] relative overflow-hidden"
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
                                    className="w-full rounded-xl border border-white/[0.08] bg-black/[0.25] px-4 py-3 text-[15px] text-white focus:outline-none focus:ring-2 focus:ring-[var(--as-violet)]/30 focus:border-[var(--as-violet)] hover:border-white/[0.15] transition-all duration-300"
                                >
                                    {BUSINESS_TYPES.map((b) => (
                                        <option key={b} value={b} className="bg-[#0b1120] text-white">
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

                            <div className="md:col-span-1">
                                <label className="block text-xs tracking-[0.18em] uppercase font-bold text-[var(--as-violet)] mb-2">
                                    Workflow To Automate
                                </label>
                                <select
                                    name="workflow"
                                    value={form.workflow}
                                    onChange={onChange}
                                    className="w-full rounded-xl border border-white/[0.08] bg-black/[0.25] px-4 py-3 text-[15px] text-white focus:outline-none focus:ring-2 focus:ring-[var(--as-violet)]/30 focus:border-[var(--as-violet)] hover:border-white/[0.15] transition-all duration-300"
                                >
                                    {WORKFLOW_OPTIONS.map((w) => (
                                        <option key={w} value={w} className="bg-[#0b1120] text-white">
                                            {w}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-xs tracking-[0.18em] uppercase font-bold text-[var(--as-violet)] mb-2">
                                    Daily Conversations
                                </label>
                                <select
                                    name="conversations"
                                    value={form.conversations}
                                    onChange={onChange}
                                    className="w-full rounded-xl border border-white/[0.08] bg-black/[0.25] px-4 py-3 text-[15px] text-white focus:outline-none focus:ring-2 focus:ring-[var(--as-violet)]/30 focus:border-[var(--as-violet)] hover:border-white/[0.15] transition-all duration-300"
                                >
                                    {CONVERSATION_VOLUMES.map((v) => (
                                        <option key={v} value={v} className="bg-[#0b1120] text-white">
                                            {v}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <Field
                                    label="Platforms Currently Used"
                                    name="platforms"
                                    value={form.platforms}
                                    onChange={onChange}
                                    placeholder="e.g. Google Calendar, Zoho CRM, WhatsApp Business API"
                                    testId="contact-input-platforms"
                                />
                            </div>
                        </div>
 
                        {error && (
                            <div
                                className="mt-5 px-4 py-3 rounded-xl bg-red-950/40 text-red-200 text-sm border border-red-900/30"
                                data-testid="contact-form-error"
                            >
                                {error}
                            </div>
                        )}
                        {success && (
                            <div
                                className="mt-5 px-4 py-3 rounded-xl bg-emerald-950/40 text-emerald-200 text-sm border border-emerald-900/30 flex items-center gap-2"
                                data-testid="contact-form-success"
                            >
                                <Check
                                    size={16}
                                    className="text-emerald-400"
                                />
                                {success}
                            </div>
                        )}
 
                        <div className="mt-7 flex items-center justify-between gap-4 flex-wrap">
                            <p className="text-xs text-white/40">
                                Systems review completed within 24 hours. By submitting you agree to our privacy policy.
                            </p>
                            <MagneticButton
                                type="submit"
                                onClick={() => {}}
                                data-testid="contact-form-submit"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--as-violet)] text-white font-semibold shadow-[0_0_32px_rgba(var(--as-violet-rgb),0.35)] hover:bg-[var(--as-violet-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 cursor-pointer"
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
                                        ? "Deploying…"
                                        : "Launch Your AI Employee"}
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
                className="block text-xs tracking-[0.18em] uppercase font-bold text-[var(--as-violet)] mb-2"
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
                className="w-full rounded-xl border border-white/[0.08] bg-black/[0.25] px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--as-violet)]/30 focus:border-[var(--as-violet)] hover:border-white/[0.15] transition-all duration-300"
            />
        </div>
    );
}
