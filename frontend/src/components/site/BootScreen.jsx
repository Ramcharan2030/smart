import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

// Technical HUD Diagnostic Stream lines (declared statically outside component to satisfy ESLint)
const DIAGNOSTIC_DATA = [
    "ESTABLISHING SECURE CONNECTION TO AUTOSOLUTIONS CORE...",
    "INITIALIZING NEURAL CLASSIFIERS (CONFIDENCE: 99.4%)...",
    "SYNCING VOICE SIP PIPELINES & WHATSAPP CHANNELS...",
    "MOUNTING COGNITIVE REASONING MATRIX...",
    "VERIFYING DATA SECURE HANDSHAKES... OK",
    "LOAD SYSTEM STABILIZERS... STABLE",
    "ESTABLISHING AUTONOMOUS WORKFORCE ROUTINES...",
    "COGNITIVE INTERFACE BOOT SUCCESSFUL.",
];

export default function BootScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [statusLines, setStatusLines] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Tracking pointer coordinates for interactive particle wind
    useEffect(() => {
        const handlePointer = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY,
            };
        };
        window.addEventListener("pointermove", handlePointer);
        return () => window.removeEventListener("pointermove", handlePointer);
    }, []);

    // 1. Dynamic Typing Diagnostic Stream
    useEffect(() => {
        let timer;
        let lineIndex = 0;
        
        const addLine = () => {
            if (lineIndex < DIAGNOSTIC_DATA.length) {
                setStatusLines(prev => [...prev, DIAGNOSTIC_DATA[lineIndex]]);
                lineIndex++;
                timer = setTimeout(addLine, 220 + Math.random() * 200);
            }
        };

        timer = setTimeout(addLine, 150);
        return () => clearTimeout(timer);
    }, []);

    // 2. Incremental Numeric Progress Loader
    useEffect(() => {
        const duration = 2200; // 2.2 seconds loading
        const interval = 25; 
        const step = 100 / (duration / interval);
        
        let cur = 0;
        const timer = setInterval(() => {
            cur += step;
            if (cur >= 100) {
                setProgress(100);
                clearInterval(timer);
                setTimeout(() => {
                    setIsLoaded(true);
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 800); // Wait for zoom animation to end
                }, 400);
            } else {
                setProgress(Math.floor(cur));
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    // 3. Lightweight Dynamic Cyan Micro-Particle Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = (canvas.width = window.innerWidth);
            height = (canvas.height = window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // Particle configuration
        const count = 120;
        const particles = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 0.5 + Math.random() * 1.5,
                vx: -0.3 + Math.random() * 0.6,
                vy: -0.5 - Math.random() * 1.0,
                alpha: 0.2 + Math.random() * 0.6,
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = "rgba(79, 209, 255, "; 
            particles.forEach((p) => {
                // Interactive cursor wind logic
                const dx = mouseRef.current.x - p.x;
                const dy = mouseRef.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let fx = 0;
                let fy = 0;
                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    fx = (dx / dist) * force * 0.4;
                    fy = (dy / dist) * force * 0.4;
                }

                p.x += p.vx + fx;
                p.y += p.vy + fy;

                // Loop particles around viewport boundaries
                if (p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }
                if (p.x < 0 || p.x > width) {
                    p.x = Math.random() * width;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(79, 209, 255, ${p.alpha})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col justify-between p-8 md:p-12 overflow-hidden select-none"
                >
                    {/* Dynamic Canvas Layer */}
                    <canvas 
                        ref={canvasRef} 
                        className="absolute inset-0 z-0 pointer-events-none opacity-50"
                    />

                    {/* HUD Status Header */}
                    <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-white/30 uppercase">
                        <div className="flex items-center gap-2">
                            <Activity size={12} className="text-[var(--as-violet)] animate-pulse" />
                            <span>AS_SYS_DIAGNOSTIC_SHELL_OK</span>
                        </div>
                        <div className="hidden sm:block">
                            SECURE ACCESS PROTOCOL // MAIN_INIT
                        </div>
                    </div>

                    {/* Central Metallic Logo & Pulse Ring */}
                    <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-8">
                        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                            {/* Technical Glowing Pulse Ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="46%"
                                    stroke="rgba(255, 255, 255, 0.04)"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                                <motion.circle
                                    cx="50%"
                                    cy="50%"
                                    r="46%"
                                    stroke="var(--as-violet)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="290"
                                    strokeDashoffset={290 - (290 * progress) / 100}
                                    style={{
                                        filter: "drop-shadow(0 0 8px rgba(79, 209, 255, 0.4))",
                                    }}
                                    transition={{ ease: "easeInOut" }}
                                />
                            </svg>

                            {/* Rotating Metallic Logo Element */}
                            <motion.div
                                animate={{
                                    rotateY: 360,
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "linear",
                                }}
                                className="relative z-10 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center pointer-events-none"
                            >
                                <img
                                    src="/logo.png"
                                    alt="AutoSolutions Logo Emblem"
                                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(79,209,255,0.25)] brightness-125"
                                    style={{
                                        transformStyle: "preserve-3d",
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* Percent Loader */}
                        <div className="mt-8 text-center">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm font-mono tracking-[0.3em] text-white/50"
                            >
                                LOADING <span className="text-[var(--as-violet)] font-bold">{progress.toString().padStart(3, "0")}%</span>
                            </motion.p>
                            <p className="text-[9px] font-mono text-white/20 tracking-wider uppercase mt-1">
                                {progress < 100 ? "establishing console..." : "systems fully online"}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Technical Diagnostics Stream */}
                    <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                        {/* Status Type Console */}
                        <div className="md:col-span-8 font-mono text-[9px] md:text-[10px] leading-relaxed text-white/40 flex flex-col gap-1 max-h-[85px] overflow-hidden">
                            {statusLines.slice(-4).map((line, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <span className="text-[var(--as-violet)]">//</span>
                                    <span>{line}</span>
                                </div>
                            ))}
                        </div>

                        {/* Security indicators */}
                        <div className="md:col-span-4 flex justify-end gap-5 text-[9px] font-mono tracking-wider text-white/20">
                            <div className="flex items-center gap-1.5 border border-white/5 px-2.5 py-1 rounded">
                                <Terminal size={10} className="text-[var(--as-violet)]" />
                                <span>SSL_ACTIVE</span>
                            </div>
                            <div className="flex items-center gap-1.5 border border-white/5 px-2.5 py-1 rounded">
                                <Shield size={10} className="text-emerald-400" />
                                <span>SHIELD_ENCRYPTED</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
