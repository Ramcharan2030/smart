import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D AI neural network orb — pure vanilla Three.js (no R3F JSX) to avoid
 * visual-edits build attribute conflicts. Particles + sparse line
 * connections + soft glow core. Reacts to mouse, slow auto-rotate.
 */
export default function HeroOrb() {
    const mountRef = useRef(null);
    const pointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        let width = mount.clientWidth;
        let height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 4.4);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        renderer.domElement.style.display = "block";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";

        // Build scene
        const group = new THREE.Group();
        scene.add(group);

        const COUNT = 480;
        const RADIUS = 1.6;
        const positions = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const r = RADIUS * (0.85 + Math.random() * 0.18);
            positions[i * 3] = Math.cos(theta) * Math.sin(phi) * r;
            positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * r;
            positions[i * 3 + 2] = Math.cos(phi) * r;
        }

        const pointsGeom = new THREE.BufferGeometry();
        pointsGeom.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3),
        );
        const pointsMat = new THREE.PointsMaterial({
            size: 0.05,
            sizeAttenuation: true,
            color: new THREE.Color("#F97316"),
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
        });
        group.add(new THREE.Points(pointsGeom, pointsMat));

        const tmpA = new THREE.Vector3();
        const tmpB = new THREE.Vector3();
        const linePositions = [];
        const MAX_DIST = 0.42;
        for (let i = 0; i < COUNT; i++) {
            tmpA.fromArray(positions, i * 3);
            for (let attempt = 0; attempt < 6; attempt++) {
                const j = Math.floor(Math.random() * COUNT);
                if (j === i) continue;
                tmpB.fromArray(positions, j * 3);
                if (tmpA.distanceTo(tmpB) < MAX_DIST) {
                    linePositions.push(
                        tmpA.x,
                        tmpA.y,
                        tmpA.z,
                        tmpB.x,
                        tmpB.y,
                        tmpB.z,
                    );
                    break;
                }
            }
        }
        const linesGeom = new THREE.BufferGeometry();
        linesGeom.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(linePositions, 3),
        );
        const linesMat = new THREE.LineBasicMaterial({
            color: new THREE.Color("#F97316"),
            transparent: true,
            opacity: 0.2,
            depthWrite: false,
        });
        group.add(new THREE.LineSegments(linesGeom, linesMat));

        // Inner glow core
        group.add(
            new THREE.Mesh(
                new THREE.SphereGeometry(0.45, 32, 32),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.55,
                }),
            ),
        );
        group.add(
            new THREE.Mesh(
                new THREE.SphereGeometry(0.7, 32, 32),
                new THREE.MeshBasicMaterial({
                    color: new THREE.Color("#F97316"),
                    transparent: true,
                    opacity: 0.08,
                }),
            ),
        );

        // Animation loop
        let rafId;
        const clock = new THREE.Clock();
        const animate = () => {
            const dt = clock.getDelta();
            const t = clock.elapsedTime;
            if (!reduceMotion) {
                group.rotation.y += dt * 0.2;
                group.rotation.x += dt * 0.05;
                group.position.x = pointer.current.x * 0.18;
                group.position.y = pointer.current.y * 0.12;
                const s = 1 + Math.sin(t * 1.2) * 0.025;
                group.scale.setScalar(s);
            }
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);

        // Resize
        const resize = () => {
            width = mount.clientWidth;
            height = mount.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(mount);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
            mount.removeChild(renderer.domElement);
            renderer.dispose();
            pointsGeom.dispose();
            linesGeom.dispose();
            pointsMat.dispose();
            linesMat.dispose();
            group.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) obj.material.dispose();
            });
        };
    }, []);

    const onMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onMouseLeave = () => {
        pointer.current.x = 0;
        pointer.current.y = 0;
    };

    return (
        <div
            className="relative w-full h-full"
            data-testid="hero-3d-orb"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(closest-side, rgba(249,115,22,0.22), rgba(249,115,22,0.08) 50%, transparent 75%)",
                    filter: "blur(8px)",
                }}
            />
            <div ref={mountRef} className="absolute inset-0" />
        </div>
    );
}
