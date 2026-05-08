import { useEffect, useRef, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "How It Works", href: "#how" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (href) => {
        const target = document.querySelector(href);
        if (!target) return;
        if (window.__lenis) {
            window.__lenis.scrollTo(target, { offset: -80, duration: 1.2 });
        } else {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setOpen(false);
    };

    return (
        <header
            ref={ref}
            data-testid="site-navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "backdrop-blur-xl bg-white/75 border-b border-black/5"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => scrollTo("#home")}
                    className="flex items-center gap-2 group"
                    data-testid="nav-logo"
                >
                    <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#F97316] text-white shadow-[0_4px_18px_rgba(249,115,22,0.4)]">
                        <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                        <span className="absolute inset-0 rounded-lg as-pulse-glow" />
                    </span>
                    <span className="font-extrabold text-[18px] tracking-tight text-[#0A0A1A]">
                        AutoSolutions
                        <span className="text-[#F97316]">.in</span>
                    </span>
                </button>

                {/* Links */}
                <nav className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => scrollTo(l.href)}
                            data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                            className="px-4 py-2 text-sm font-medium text-[#4A4A5A] hover:text-[#0A0A1A] transition-colors rounded-full hover:bg-black/[0.03]"
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:block">
                    <MagneticButton
                        as="a"
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo("#contact");
                        }}
                        data-testid="nav-book-demo-btn"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F97316] text-white text-sm font-semibold shadow-[0_6px_22px_rgba(249,115,22,0.45)] hover:bg-[#EA580C] transition-colors"
                    >
                        Book a Free Demo
                    </MagneticButton>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle navigation"
                    data-testid="nav-mobile-toggle"
                    className="lg:hidden p-2 rounded-md hover:bg-black/5"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="lg:hidden border-t border-black/5 bg-white/90 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
                        {NAV_LINKS.map((l) => (
                            <button
                                key={l.href}
                                onClick={() => scrollTo(l.href)}
                                className="text-left px-3 py-3 rounded-xl text-[15px] font-medium text-[#0A0A1A] hover:bg-black/5"
                                data-testid={`nav-mobile-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                                {l.label}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollTo("#contact")}
                            data-testid="nav-mobile-book-demo"
                            className="mt-2 inline-flex justify-center px-5 py-3 rounded-full bg-[#F97316] text-white text-sm font-semibold"
                        >
                            Book a Free Demo
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
