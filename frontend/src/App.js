import "@/App.css";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import SmoothScroll from "@/components/site/SmoothScroll";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import SocialProofTicker from "@/components/site/SocialProofTicker";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import BootScreen from "@/components/site/BootScreen";

// Lazy loaded components for better initial performance
const Services = lazy(() => import("@/components/site/Services"));
const WorkflowVisualization = lazy(() => import("@/components/site/WorkflowVisualization"));
const HowItWorks = lazy(() => import("@/components/site/HowItWorks"));
const Industries = lazy(() => import("@/components/site/Industries"));
const Stats = lazy(() => import("@/components/site/Stats"));
const Testimonials = lazy(() => import("@/components/site/Testimonials"));
const FAQ = lazy(() => import("@/components/site/FAQ"));
const CTABanner = lazy(() => import("@/components/site/CTABanner"));
const Contact = lazy(() => import("@/components/site/Contact"));
const DemoVideo = lazy(() => import("@/components/site/DemoVideo"));


import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

function Landing() {
    const [bootComplete, setBootComplete] = useState(false);

    useEffect(() => {
        if (!bootComplete) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [bootComplete]);

    return (
        <>
            <BootScreen onComplete={() => setBootComplete(true)} />
            <SmoothScroll>
                <Navbar />
                <main>
                    <Hero />
                    <SocialProofTicker />
                    <Suspense fallback={<div className="h-40 flex items-center justify-center opacity-0">Loading...</div>}>
                        <DemoVideo />
                        <Services />
                        <WorkflowVisualization />
                        <HowItWorks />
                        <Industries />
                        <Stats />
                        <Testimonials />
                        <div id="faq">
                            <FAQ />
                        </div>
                        <CTABanner />
                        <Contact />
                    </Suspense>
                </main>
                <Footer />
                <WhatsAppFloat />
            </SmoothScroll>
        </>
    );
}

function App() {
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!backendUrl || backendUrl.includes("localhost")) return;

        const ping = async () => {
            try {
                await fetch(`${backendUrl}/api/health`);
            } catch (e) {
                // Ignore errors
            }
        };

        // Ping every 12 minutes
        const interval = setInterval(ping, 12 * 60 * 1000);
        ping();

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <ThemeProvider attribute="class" defaultTheme="dark">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
