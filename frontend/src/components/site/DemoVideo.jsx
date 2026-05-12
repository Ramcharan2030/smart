import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useRef } from "react";

export default function DemoVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section
            id="demo"
            data-testid="demo-video-section"
            className="relative py-24 md:py-32 bg-as-bg overflow-hidden"
        >
            {/* Background decorative elements */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-50 pointer-events-none"
                aria-hidden
            >
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--as-violet)]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--as-violet)]/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4"
                    >
                        See it in action
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-extrabold tracking-tighter text-[var(--as-ink)] text-4xl sm:text-5xl leading-[1.04] mb-6"
                    >
                        Experience the power of <span className="text-[var(--as-violet)]">AutoSolutions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-[var(--as-ink-soft)] text-lg leading-relaxed"
                    >
                        Watch how our AI agents handle calls, book appointments, and manage leads with human-like intelligence.
                    </motion.p>
                </div>

                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(108,92,231,0.15)] border border-white/40 as-glass"
                >
                    <div className="aspect-video relative bg-black/5">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            poster="/logo.jpg" // Using logo as placeholder if video is slow to load
                            onClick={togglePlay}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        >
                            <source src="/demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Play Overlay */}
                        {!isPlaying && (
                            <div 
                                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer group"
                                onClick={togglePlay}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-20 h-20 rounded-full bg-[var(--as-violet)] text-white flex items-center justify-center shadow-[0_15px_40px_rgba(108,92,231,0.5)] group-hover:bg-[var(--as-violet-hover)] transition-colors"
                                >
                                    <Play size={32} fill="currentColor" className="ml-1" />
                                </motion.div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
