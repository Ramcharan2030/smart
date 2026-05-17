import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { Play, ArrowRight, Activity, Cpu, Terminal, Shield, MessageSquare, Phone, Database, Calendar } from "lucide-react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function CinematicStoryteller() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const textScene1Ref = useRef(null);
    const textScene2Ref = useRef(null);
    const textScene3Ref = useRef(null);
    
    const [activeHudText, setActiveHudText] = useState("CORE_SYSTEM_ACTIVE");

    const scrollToContact = () => {
        const el = document.querySelector("#contact");
        if (el) {
            if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
            else el.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // 1. Three.js Volumetric System Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.12);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        // 2. Volumetric Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0x4fd1ff, 2.0); // Cyan light
        mainLight.position.set(2, 4, 5);
        scene.add(mainLight);

        const backLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
        backLight.position.set(-2, -3, -4);
        scene.add(backLight);

        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        // 3. High-Reflectivity Metallic Chrome Logo Emblem
        const logoGroup = new THREE.Group();
        rootGroup.add(logoGroup);

        // Render logo structure (outer ring + floating core shield)
        const ringGeom = new THREE.RingGeometry(0.8, 0.9, 64);
        const metallicMat = new THREE.MeshStandardMaterial({
            color: 0x4fd1ff,
            metalness: 0.95,
            roughness: 0.15,
            side: THREE.DoubleSide,
            emissive: 0x050816,
        });
        const outerRing = new THREE.Mesh(ringGeom, metallicMat);
        logoGroup.add(outerRing);

        // Central shield emblem
        const coreGeom = new THREE.CylinderGeometry(0, 0.45, 0.6, 3); // Volumetric triangular shield
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.98,
            roughness: 0.1,
            emissive: 0x4fd1ff,
            emissiveIntensity: 0.15,
        });
        const centerShield = new THREE.Mesh(coreGeom, coreMat);
        centerShield.rotation.x = Math.PI / 2;
        logoGroup.add(centerShield);

        // 4. Drift Dust Micro-Particles System
        const particleCount = 600;
        const particlePositions = new Float32Array(particleCount * 3);
        const particleSpeeds = [];

        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * 10;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            particleSpeeds.push({
                y: 0.002 + Math.random() * 0.005,
                x: -0.001 + Math.random() * 0.002,
            });
        }

        const particleGeom = new THREE.BufferGeometry();
        particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
        
        const particleMat = new THREE.PointsMaterial({
            color: 0x4fd1ff,
            size: 0.035,
            transparent: true,
            opacity: 0.4,
            depthWrite: false,
        });
        const dustPoints = new THREE.Points(particleGeom, particleMat);
        scene.add(dustPoints);

        // 5. Expandable Neural Pipeline Nodes Network
        const nodesGroup = new THREE.Group();
        nodesGroup.position.set(0, 0, 0);
        nodesGroup.visible = false; // Hidden at Scene 1
        rootGroup.add(nodesGroup);

        const nodeCoordinates = [
            { x: -1.8, y: 0.8, z: 0, label: "WhatsApp" },
            { x: -1.8, y: -0.8, z: 0, label: "Voice API" },
            { x: 0, y: 0, z: 0.5, label: "AI Core" },
            { x: 1.8, y: 0.8, z: 0, label: "CRM Sync" },
            { x: 1.8, y: -0.8, z: 0, label: "Scheduling" },
        ];

        const nodeMat = new THREE.MeshStandardMaterial({
            color: 0x4fd1ff,
            metalness: 0.9,
            roughness: 0.2,
            emissive: 0x38bdf8,
            emissiveIntensity: 0.3,
        });

        const activeNodes = [];
        nodeCoordinates.forEach((coord) => {
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.18, 32, 32), nodeMat);
            sphere.position.set(coord.x, coord.y, coord.z);
            nodesGroup.add(sphere);
            activeNodes.push(sphere);
        });

        // Connector pipelines
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.25,
        });

        const connectNodes = (n1, n2) => {
            const geom = new THREE.BufferGeometry().setFromPoints([n1.position, n2.position]);
            const line = new THREE.Line(geom, lineMat);
            nodesGroup.add(line);
        };

        // Build grid connections
        connectNodes(activeNodes[0], activeNodes[2]);
        connectNodes(activeNodes[1], activeNodes[2]);
        connectNodes(activeNodes[2], activeNodes[3]);
        connectNodes(activeNodes[2], activeNodes[4]);

        // 6. GSAP ScrollTrigger Master Scene Choreography Timeline
        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2,
                onUpdate: (self) => {
                    // Dynamic HUD text updates on scroll progress
                    const p = self.progress;
                    if (p < 0.25) setActiveHudText("ESTABLISHING_SYSTEM_CONSOLE");
                    else if (p < 0.55) setActiveHudText("BOOTING_AI_WORKFORCE_LAYER");
                    else if (p < 0.85) setActiveHudText("TRANSITIONING_NEURAL_PIPELINES");
                    else setActiveHudText("SYSTEM_OPERATIONS_STABLE");
                }
            }
        });

        // Scene 1 & 2: Zoom in, scale head, rotate logo
        masterTimeline.to(camera.position, { z: 1.8, ease: "none" }, 0)
            .to(logoGroup.rotation, { y: Math.PI * 2, z: 0.5, ease: "none" }, 0)
            .to(textScene1Ref.current, { opacity: 1, scale: 1, filter: "blur(0px)", ease: "none" }, 0.05)
            .to(textScene1Ref.current, { opacity: 0, scale: 1.15, filter: "blur(8px)", ease: "none" }, 0.25);

        // Scene 3: Morph logo into network pipelines
        masterTimeline.to(logoGroup.scale, { x: 0, y: 0, z: 0, ease: "none" }, 0.28)
            .to(camera.position, { z: 4.8, y: 0.2, ease: "none" }, 0.28)
            .call(() => { nodesGroup.visible = true; }, null, 0.3)
            .fromTo(nodesGroup.scale, { x: 0.1, y: 0.1, z: 0.1 }, { x: 1, y: 1, z: 1, ease: "none" }, 0.3)
            .to(textScene2Ref.current, { opacity: 1, y: 0, filter: "blur(0px)", ease: "none" }, 0.35)
            .to(textScene2Ref.current, { opacity: 0, y: -40, filter: "blur(6px)", ease: "none" }, 0.55);

        // Scene 4: Node rotations and operational outcome reveals
        masterTimeline.to(nodesGroup.rotation, { y: 0.8, x: 0.2, ease: "none" }, 0.55)
            .to(textScene3Ref.current, { opacity: 1, y: 0, filter: "blur(0px)", ease: "none" }, 0.6)
            .to(textScene3Ref.current, { opacity: 0.3, y: -20, ease: "none" }, 0.85)
            .to(camera.position, { z: 6.2, y: -0.8, ease: "none" }, 0.8);

        // 7. Render Animation Loop
        let frameId;
        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();

            // Constant micro-rotations
            if (logoGroup) {
                logoGroup.rotation.y += 0.003;
                logoGroup.rotation.x = Math.sin(time * 0.5) * 0.15;
            }

            if (nodesGroup && nodesGroup.visible) {
                nodesGroup.rotation.y = nodesGroup.rotation.y + 0.001;
                activeNodes.forEach((node, idx) => {
                    node.position.y += Math.sin(time + idx) * 0.0015;
                });
            }

            // Drifting dust loop
            const positions = particleGeom.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3 + 1] += particleSpeeds[i].y;
                positions[i * 3] += particleSpeeds[i].x;

                // Recycle boundaries
                if (positions[i * 3 + 1] > 5) positions[i * 3 + 1] = -5;
                if (positions[i * 3] > 5 || positions[i * 3] < -5) positions[i * 3] = (Math.random() - 0.5) * 10;
            }
            particleGeom.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize events
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
            renderer.dispose();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[500vh] bg-[#000000] z-10">
            {/* Sticky Viewport Canvas Frame */}
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
                
                {/* Volumetric ambient background shadow */}
                <div className="absolute inset-0 bg-radial-gradient z-0 pointer-events-none opacity-20" />

                {/* Technical HUD Frame */}
                <div className="absolute inset-x-6 top-[88px] md:inset-x-12 z-20 flex justify-between items-center pointer-events-none select-none text-[9px] font-mono tracking-widest text-white/30">
                    <div className="flex items-center gap-2">
                        <Activity size={10} className="text-[var(--as-violet)] animate-pulse" />
                        <span>SYS_REVEAL_ENGINE // {activeHudText}</span>
                    </div>
                    <div className="hidden sm:block">
                        PERSPECTIVE_ZOOM: ACTIVE
                    </div>
                </div>

                {/* ============================================================
                    SCENE 1 & 2: Brand Slogan Reveal
                   ============================================================ */}
                <div 
                    ref={textScene1Ref}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none opacity-0 scale-95 select-none"
                    style={{ filter: "blur(10px)" }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] text-[10px] font-mono font-semibold tracking-widest text-white/60 uppercase mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--as-violet)] animate-pulse" />
                        Autonomous Intelligence
                    </div>
                    <h1 className="font-extrabold text-white tracking-tighter leading-[0.9] font-display text-5xl sm:text-7xl lg:text-[96px] max-w-5xl">
                        Your AI Workforce.
                        <br />
                        <span className="bg-gradient-to-r from-[var(--as-violet)] via-[#38bdf8] to-white bg-clip-text text-transparent">
                            Running 24/7.
                        </span>
                    </h1>
                    <p className="text-white/50 text-sm sm:text-base max-w-xl leading-relaxed mt-6 font-medium">
                        Deploy secure, self-evolving AI employees that answer calls, manage lead pipelines, reply on WhatsApp, and schedule diagnostics autonomously.
                    </p>
                </div>

                {/* ============================================================
                    SCENE 3: Core Workflow Pipeline Hub
                   ============================================================ */}
                <div 
                    ref={textScene2Ref}
                    className="absolute inset-x-6 bottom-16 md:inset-x-12 md:bottom-24 z-10 pointer-events-none select-none opacity-0 translate-y-10"
                    style={{ filter: "blur(8px)" }}
                >
                    <div className="max-w-3xl">
                        <p className="text-xs font-mono font-bold tracking-widest text-[var(--as-violet)] uppercase mb-3">
                            NEURAL INTERACTION NETWORK
                        </p>
                        <h2 className="font-extrabold text-white tracking-tight leading-none font-display text-4xl sm:text-5xl md:text-6xl">
                            Continuous Operations.
                        </h2>
                        <p className="text-white/50 text-sm sm:text-base max-w-xl leading-relaxed mt-4">
                            Your logo morphs directly into a secure node pipeline structure, synchronizing CRM updates, live inbound reception channels, and calendars.
                        </p>
                    </div>
                </div>

                {/* ============================================================
                    SCENE 4: High-End Volumetric Metrics
                   ============================================================ */}
                <div 
                    ref={textScene3Ref}
                    className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 z-10 pointer-events-none select-none opacity-0 translate-y-10"
                    style={{ filter: "blur(8px)" }}
                >
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-6">
                            <p className="text-xs font-mono font-bold tracking-widest text-[var(--as-violet)] uppercase">
                                PROVEN PERFORMANCE METRICS
                            </p>
                            <h3 className="font-extrabold text-white tracking-tighter font-display text-4xl sm:text-5xl lg:text-7xl leading-none">
                                Operational
                                <br />
                                Acceleration.
                            </h3>
                            <p className="text-white/50 text-sm sm:text-base max-w-md leading-relaxed">
                                Cut organizational drag, satisfy customer demands instantly, and run absolute systems infrastructure that never sleeps.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 md:gap-8">
                            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.05] backdrop-blur-md">
                                <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Response Latency</p>
                                <p className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">300ms</p>
                                <p className="text-[10px] text-emerald-400 mt-2 font-mono">⚡ 99.8% SLA STABLE</p>
                            </div>
                            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.05] backdrop-blur-md">
                                <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Conversational QA</p>
                                <p className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">99.4%</p>
                                <p className="text-[10px] text-[var(--as-violet)] mt-2 font-mono">🛡️ SECURED CONFIDENCE</p>
                            </div>
                            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.05] backdrop-blur-md">
                                <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Cost Reductions</p>
                                <p className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">92%</p>
                                <p className="text-[10px] text-white/40 mt-2 font-mono">COMPARED TO BPO</p>
                            </div>
                            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.05] backdrop-blur-md">
                                <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest">System Availability</p>
                                <p className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">24/7</p>
                                <p className="text-[10px] text-white/40 mt-2 font-mono">0 SECONDS DOWNTIME</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Technical HUD Footer */}
                <div className="absolute inset-x-6 bottom-8 md:inset-x-12 z-20 flex justify-between items-center pointer-events-none select-none text-[8px] sm:text-[9px] font-mono text-white/20">
                    <div className="flex gap-4">
                        <span>ESTABLISHING_SECURE_SHELL // OK</span>
                        <span className="hidden sm:inline">FRAME_RENDER_TIME: 1.2ms</span>
                    </div>
                    <div className="flex items-center gap-1.5 border border-white/5 px-2 py-0.5 rounded pointer-events-auto cursor-pointer" onClick={scrollToContact}>
                        <span>SCROLL TO BOOT SYSTEM DIAGNOSTIC</span>
                        <ArrowRight size={10} className="text-[var(--as-violet)]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
