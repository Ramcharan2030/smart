import { Sparkles, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

const SECTIONS = [
    {
        title: "Product",
        links: [
            { label: "Services", href: "#services" },
            { label: "Industries", href: "#industries" },
            { label: "Pricing", href: "#pricing" },
            { label: "How it works", href: "#how" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Contact", href: "#contact" },
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Careers", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "FAQ", href: "#faq" },
            { label: "Case Studies", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Help Center", href: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer
            data-testid="site-footer"
            className="relative bg-[#0A0A1A] text-white pt-20 pb-10"
        >
            {/* subtle violet glow */}
            <div
                className="as-blob"
                style={{
                    width: 480,
                    height: 480,
                    background: "rgba(108,92,231,0.45)",
                    top: -200,
                    left: "30%",
                    opacity: 0.18,
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-5">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#6C5CE7] text-white">
                            <Sparkles size={16} strokeWidth={2.5} />
                        </span>
                        <span className="font-extrabold text-lg tracking-tight">
                            AutoSolutions
                            <span className="text-[#6C5CE7]">.in</span>
                        </span>
                    </div>
                    <p className="mt-4 text-white/70 max-w-md leading-relaxed">
                        Automating India's businesses, one bot at a time. Built
                        in India for clinics, hospitals, cafes, retail, and
                        more.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                        {[
                            { Icon: Linkedin, href: "#", label: "LinkedIn" },
                            { Icon: Instagram, href: "#", label: "Instagram" },
                            { Icon: Twitter, href: "#", label: "Twitter / X" },
                            { Icon: Youtube, href: "#", label: "YouTube" },
                        ].map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                data-testid={`social-${label.toLowerCase().split(" ")[0]}`}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/8 hover:bg-[#6C5CE7] border border-white/10 transition-colors"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {SECTIONS.map((s) => (
                        <div key={s.title}>
                            <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#6C5CE7] mb-4">
                                {s.title}
                            </p>
                            <ul className="space-y-3">
                                {s.links.map((l) => (
                                    <li key={l.label}>
                                        <a
                                            href={l.href}
                                            className="text-sm text-white/75 hover:text-white transition-colors"
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <p className="text-xs text-white/50">
                    © 2025 AutoSolutions.in — All Rights Reserved.
                </p>
                <p className="text-xs text-white/50">
                    Built with ♥ in India · DPDP & GDPR aware
                </p>
            </div>
        </footer>
    );
}
