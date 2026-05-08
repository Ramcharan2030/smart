import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SmoothScroll from "@/components/site/SmoothScroll";
import CustomCursor from "@/components/site/CustomCursor";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import SocialProofTicker from "@/components/site/SocialProofTicker";
import Services from "@/components/site/Services";
import HowItWorks from "@/components/site/HowItWorks";
import Industries from "@/components/site/Industries";
import Stats from "@/components/site/Stats";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import CTABanner from "@/components/site/CTABanner";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

function Landing() {
    return (
        <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main>
                <Hero />
                <SocialProofTicker />
                <Services />
                <HowItWorks />
                <Industries />
                <Stats />
                <Pricing />
                <Testimonials />
                <div id="faq">
                    <FAQ />
                </div>
                <CTABanner />
                <Contact />
            </main>
            <Footer />
        </SmoothScroll>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
