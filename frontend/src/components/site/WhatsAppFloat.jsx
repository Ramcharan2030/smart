import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
        
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    const whatsappUrl = "https://wa.me/917989831473?text=Hi%20AutoSolutions!%20I'm%20interested%20in%20your%20AI%20automation%20services.%20Can%20we%20connect%3F";

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        className="relative"
                    >
                        {/* Tooltip */}
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="absolute bottom-full right-0 mb-4 whitespace-nowrap"
                                >
                                    <div className="bg-as-bg text-[var(--as-ink)] px-4 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-as-border flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <p className="text-[13px] font-bold leading-none">Need help?</p>
                                            <p className="text-[11px] text-[var(--as-ink-soft)] mt-1">Chat with us on WhatsApp</p>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowTooltip(false);
                                            }}
                                            className="p-1 hover:bg-black/5 rounded-full transition-colors"
                                        >
                                            <X size={14} className="text-[var(--as-ink-muted)]" />
                                        </button>
                                        <div className="absolute top-full right-5 w-3 h-3 bg-as-bg border-r border-b border-as-border rotate-45 -translate-y-1.5" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main FAB */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#10B981] text-as-ink shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                            <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-20" />
                            <MessageCircle size={28} className="relative z-10" />
                            
                            {/* Hover label */}
                            <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-as-bg text-as-ink text-[12px] font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
                                Chat with us
                            </span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
