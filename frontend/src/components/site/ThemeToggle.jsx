import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-9 h-9 flex items-center justify-center rounded-full as-glass border border-as-border text-as-ink hover:bg-as-violet-soft transition-all duration-300"
            aria-label="Toggle theme"
            data-testid="theme-toggle"
        >
            <Sun
                className={`w-[18px] h-[18px] transition-all duration-500 absolute ${
                    theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                }`}
            />
            <Moon
                className={`w-[18px] h-[18px] transition-all duration-500 absolute ${
                    theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
                }`}
            />
        </button>
    );
}
