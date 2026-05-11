import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SmoothScroll from "@/components/site/SmoothScroll";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import SocialProofTicker from "@/components/site/SocialProofTicker";
import Services from "@/components/site/Services";
import HowItWorks from "@/components/site/HowItWorks";
import Industries from "@/components/site/Industries";
import Stats from "@/components/site/Stats";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import CTABanner from "@/components/site/CTABanner";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import DemoVideo from "@/components/site/DemoVideo";


import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

function Landing() {
    return (
        <SmoothScroll>
            <Navbar />
            <main>
                <Hero />
                <SocialProofTicker />
                <DemoVideo />
                <Services />
                <HowItWorks />
                <Industries />
                <Stats />
                <Testimonials />
                <div id="faq">
                    <FAQ />
                </div>
                <CTABanner />
                <Contact />
            </main>
            <Footer />
            <WhatsAppFloat />
        </SmoothScroll>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
