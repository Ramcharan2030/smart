import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Cpu, Database, Calendar, CheckCircle2 } from "lucide-react";

export default function WorkflowVisualization() {
    const [activeStage, setActiveStage] = useState(0); // 0: Inbound, 1: Cognitive, 2: Database Sync
    const [isHovered, setIsHovered] = useState(false);

    // Auto-cycling data pipeline representation to mimic live system transactions
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStage((prev) => (prev + 1) % 3);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="workflow"
            data-testid="workflow-section"
            className="relative py-20 md:py-28 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                {/* Header */}
                <div className="flex flex-wrap items-end justify-between gap-6 mb-16 max-w-4xl">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/[0.04] border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold tracking-wider mb-4 uppercase">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            System Active
                        </div>
                        <h2 className="font-extrabold tracking-tighter text-white font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.02]">
                            Live Operations
                            <br />
                            <span className="bg-gradient-to-r from-[var(--as-violet)] via-[#a855f7] to-white bg-clip-text text-transparent">
                                Pipeline Flow.
                            </span>
                        </h2>
                    </div>
                    <p className="text-white/60 text-base sm:text-lg max-w-md leading-relaxed">
                        Visualize how our autonomous AI employee swallows inbound transactions, processes cognitive reasoning patterns, and dispatches secured database updates in 300ms.
                    </p>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    <div className="px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center backdrop-blur-md">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Runtime</p>
                        <p className="text-xl font-bold text-white mt-1">24/7 Active</p>
                    </div>
                    <div className="px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center backdrop-blur-md">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Accuracy</p>
                        <p className="text-xl font-bold text-white mt-1">99.2% Verified</p>
                    </div>
                    <div className="px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center backdrop-blur-md">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Transactions</p>
                        <p className="text-xl font-bold text-[var(--as-violet)] mt-1">1,240 Automated</p>
                    </div>
                    <div className="px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center backdrop-blur-md">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Response Lag</p>
                        <p className="text-xl font-bold text-white mt-1">92% Reduction</p>
                    </div>
                </div>

                {/* Interactive Pipeline Canvas Wrapper */}
                <div 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative w-full rounded-3xl border border-white/[0.06] bg-black/[0.2] backdrop-blur-xl p-8 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                    {/* SVG Connector Background Lines */}
                    <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
                        <svg className="w-full h-full" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Pipeline Paths */}
                            <path 
                                d="M 250 150 Q 375 150 500 150" 
                                stroke="url(#line-grad-1)" 
                                strokeWidth="2.5" 
                                strokeDasharray="8 6" 
                                className="opacity-40"
                            />
                            <path 
                                d="M 500 150 Q 625 150 750 150" 
                                stroke="url(#line-grad-2)" 
                                strokeWidth="2.5" 
                                strokeDasharray="8 6" 
                                className="opacity-40"
                            />

                            {/* Active Pulsing Flow Packets */}
                            {activeStage === 0 && (
                                <path 
                                    d="M 250 150 Q 375 150 500 150" 
                                    stroke="url(#neon-packet)" 
                                    strokeWidth="4" 
                                    strokeDasharray="40 180" 
                                    strokeDashoffset="0"
                                >
                                    <animate attributeName="stroke-dashoffset" values="220;0" dur={isHovered ? "1s" : "1.8s"} repeatCount="indefinite" />
                                </path>
                            )}
                            {activeStage === 1 && (
                                <path 
                                    d="M 500 150 Q 625 150 750 150" 
                                    stroke="url(#neon-packet)" 
                                    strokeWidth="4" 
                                    strokeDasharray="40 180" 
                                    strokeDashoffset="0"
                                >
                                    <animate attributeName="stroke-dashoffset" values="220;0" dur={isHovered ? "1s" : "1.8s"} repeatCount="indefinite" />
                                </path>
                            )}

                            {/* Neon Gradients Definition */}
                            <defs>
                                <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
                                </linearGradient>
                                <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
                                </linearGradient>
                                <linearGradient id="neon-packet" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="#A855F7" />
                                    <stop offset="100%" stopColor="white" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Nodes Interactive Grid */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
                        
                        {/* Node A: Touchpoint */}
                        <div className="flex flex-col items-center md:items-start">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-lg ${
                                activeStage === 0 
                                    ? "bg-[var(--as-violet)] border-[rgba(var(--as-violet-rgb),0.5)] text-white shadow-[0_0_32px_rgba(var(--as-violet-rgb),0.3)]" 
                                    : "bg-white/[0.02] border-white/[0.08] text-white/50"
                            }`}>
                                <div className="flex gap-1.5">
                                    <MessageSquare size={18} />
                                    <span className="text-xs font-bold font-mono">/</span>
                                    <Phone size={18} />
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">
                                    ● Voice/WA Active
                                </span>
                                <h3 className="font-bold text-lg text-white mt-2 font-display">Inbound Stream</h3>
                                <p className="text-white/50 text-sm mt-1 max-w-xs">
                                    Customer invokes custom query or schedules a meeting via voice dialer or WhatsApp.
                                </p>
                            </div>
                        </div>

                        {/* Node B: Cognitive Core ("The Brain") */}
                        <div className="flex flex-col items-center">
                            <motion.div 
                                animate={{
                                    scale: activeStage === 1 ? [1, 1.05, 1] : 1,
                                    rotate: 360
                                }}
                                transition={{
                                    scale: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                                }}
                                className={`w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-500 shadow-2xl cursor-pointer ${
                                    activeStage === 1 
                                        ? "bg-gradient-to-tr from-[var(--as-violet)] to-[#a855f7] border-white/20 text-white shadow-[0_0_40px_rgba(var(--as-violet-rgb),0.4)]" 
                                        : "bg-white/[0.03] border-white/[0.08] text-[var(--as-violet)]"
                                }`}
                            >
                                <Cpu size={28} className={activeStage === 1 ? "animate-pulse" : ""} />
                            </motion.div>

                            <div className="mt-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-500/[0.06] border border-purple-500/20 text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                                    Active Reasoning
                                </span>
                                <h3 className="font-bold text-lg text-white mt-2 font-display">Cognitive Engine</h3>
                                <p className="text-white/50 text-sm mt-1 max-w-xs">
                                    Semantic core parses intent, maps availability, and dispatches JSON operational logs.
                                </p>
                            </div>
                        </div>

                        {/* Node C: Output Outcomes */}
                        <div className="flex flex-col items-center md:items-end md:text-right">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-lg ${
                                activeStage === 2 
                                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-[0_0_32px_rgba(16,185,129,0.25)]" 
                                    : "bg-white/[0.02] border-white/[0.08] text-white/50"
                            }`}>
                                <Database size={20} />
                            </div>

                            <div className="mt-6 flex flex-col items-center md:items-end">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/[0.04] border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                                    Synced 300ms
                                </span>
                                <h3 className="font-bold text-lg text-white mt-2 font-display">Autonomous Outbox</h3>
                                <p className="text-white/50 text-sm mt-1 max-w-xs">
                                    Locks calendar appointments, updates CRM sheets, and fires out instant WhatsApp receipts.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Operational Tooltip Card - Subconscious perceived intelligence */}
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeStage}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="mt-12 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md flex flex-wrap items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-emerald-400" />
                                <div>
                                    <p className="text-xs text-white/40 font-mono uppercase tracking-wider">Active Process State</p>
                                    <p className="text-sm font-semibold text-white mt-0.5 font-display">
                                        {activeStage === 0 && "Classifying Inbound Intent (Voice/WA)"}
                                        {activeStage === 1 && "Resolving Cognitive Action Pipeline"}
                                        {activeStage === 2 && "Synchronizing Operations Database Matrix"}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-6 font-mono text-[11px] text-white/60">
                                <div>
                                    <span className="text-white/30">LATENCY:</span>{" "}
                                    <span className="text-emerald-400 font-bold">
                                        {activeStage === 0 && "280ms"}
                                        {activeStage === 1 && "320ms"}
                                        {activeStage === 2 && "290ms"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-white/30">CONFIDENCE:</span>{" "}
                                    <span className="text-[var(--as-violet)] font-bold">
                                        {activeStage === 0 && "99.2%"}
                                        {activeStage === 1 && "99.4%"}
                                        {activeStage === 2 && "100.0%"}
                                    </span>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-white/30">IS_AUTONOMOUS:</span>{" "}
                                    <span className="text-purple-400 font-bold">TRUE</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>
        </section>
    );
}
