import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "How It Works", href: "#how" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
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
        if (location.pathname !== "/") {
            navigate("/" + href);
            return;
        }
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
                    ? "backdrop-blur-xl bg-as-bg/75 border-b border-as-border"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => scrollTo("#home")}
                    className="flex items-center group"
                    data-testid="nav-logo"
                >
                    <img 
                        src="/logo.jpg" 
                        alt="AutoSolutions.in Logo" 
                        className="h-16 w-auto object-contain py-1" 
                    />
                </button>

                {/* Links */}
                <nav className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => scrollTo(l.href)}
                            data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                            className="px-4 py-2 text-sm font-medium text-as-ink-soft hover:text-as-ink transition-colors rounded-full hover:bg-as-border"
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>

                {/* CTA & Theme */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <MagneticButton
                        as="a"
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo("#contact");
                        }}
                        data-testid="nav-book-demo-btn"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#6C5CE7] text-white text-sm font-semibold shadow-[0_6px_22px_rgba(108,92,231,0.45)] hover:bg-[#5A4BD1] transition-colors"
                    >
                        Book a Free Demo
                    </MagneticButton>
                </div>

                {/* Mobile toggle */}
                <div className="flex items-center gap-3 lg:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle navigation"
                        data-testid="nav-mobile-toggle"
                        className="p-2 rounded-md hover:bg-as-border"
                    >
                        {open ? <X size={20} className="text-as-ink" /> : <Menu size={20} className="text-as-ink" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="lg:hidden border-t border-as-border bg-as-bg/90 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
                        {NAV_LINKS.map((l) => (
                            <button
                                key={l.href}
                                onClick={() => scrollTo(l.href)}
                                className="text-left px-3 py-3 rounded-xl text-[15px] font-medium text-as-ink hover:bg-as-border"
                                data-testid={`nav-mobile-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                                {l.label}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollTo("#contact")}
                            data-testid="nav-mobile-book-demo"
                            className="mt-2 inline-flex justify-center px-5 py-3 rounded-full bg-as-violet text-white text-sm font-semibold"
                        >
                            Book a Free Demo
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
