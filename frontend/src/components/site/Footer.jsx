import { Sparkles, Linkedin, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const SECTIONS = [
    {
        title: "Product",
        links: [
            { label: "Services", href: "#services" },
            { label: "Industries", href: "#industries" },
            { label: "How it works", href: "#how" },
            { label: "Contact", href: "#contact" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/#about" },
            { label: "Privacy Policy", href: "/privacy", internal: true },
            { label: "Terms of Service", href: "/terms", internal: true },
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
            className="relative bg-as-bg text-as-ink pt-20 pb-10"
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
                    <div className="flex items-center">
                        <img 
                            src="/logo.png" 
                            alt="AutoSolutions.in Logo" 
                            className="h-16 w-auto object-contain bg-as-bg rounded-md p-1" 
                        />
                    </div>
                    <p className="mt-4 text-as-ink/70 max-w-md leading-relaxed">
                        Automating India's businesses, one bot at a time. Built
                        in India for clinics, hospitals, cafes, retail, and
                        more.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                        {[
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/auto-solutions-0747a7409/", label: "LinkedIn" },
                            { Icon: Instagram, href: "https://www.instagram.com/autosolutions.in?igsh=MXd1eGJlaXAzamprbQ==", label: "Instagram" },
                            { Icon: Twitter, href: "https://x.com/AutoSolutionsin", label: "Twitter / X" },
                        ].map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                data-testid={`social-${label.toLowerCase().split(" ")[0]}`}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-as-bg/8 hover:bg-[var(--as-violet)] border border-as-border transition-colors"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {SECTIONS.map((s) => (
                        <div key={s.title}>
                            <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4">
                                {s.title}
                            </p>
                            <ul className="space-y-3">
                                {s.links.map((l) => (
                                    <li key={l.label}>
                                        {l.internal ? (
                                            <Link
                                                to={l.href}
                                                className="text-sm text-as-ink/75 hover:text-as-ink transition-colors"
                                            >
                                                {l.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={l.href}
                                                className="text-sm text-as-ink/75 hover:text-as-ink transition-colors"
                                            >
                                                {l.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 mt-14 pt-8 border-t border-as-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <p className="text-xs text-as-ink/50">
                    © 2025 AutoSolutions.in — All Rights Reserved.
                </p>
                <p className="text-xs text-as-ink/50">
                    Built with ♥ in India · DPDP & GDPR aware
                </p>
            </div>
        </footer>
    );
}
