import React, { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import SmoothScroll from "@/components/site/SmoothScroll";

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <SmoothScroll>
            <Navbar />
            <div className="relative bg-[#0A0A1A] text-white pt-32 pb-20 min-h-screen">
                {/* subtle violet glow */}
                <div
                    className="as-blob fixed"
                    style={{
                        width: 600,
                        height: 600,
                        background: "rgba(108,92,231,0.3)",
                        top: -200,
                        right: -100,
                        opacity: 0.15,
                        zIndex: 0,
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#6C5CE7] mb-4">
                        Legal
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-10 leading-[1.1]">
                        Privacy Policy
                    </h1>

                    <div className="space-y-10 text-white/70 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
                            <p>
                                Welcome to AutoSolutions.in. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
                            <p>
                                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, such as:
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                <li>Name and contact data (Email address, phone number).</li>
                                <li>Business information (Type of business, automation needs).</li>
                                <li>Technical data (IP address, browser type, device information via cookies).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                            <p>
                                We use the information we collect for various purposes, including:
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                <li>To provide, operate, and maintain our services.</li>
                                <li>To improve, personalize, and expand our services.</li>
                                <li>To communicate with you, either directly or through one of our partners, including for customer service and marketing.</li>
                                <li>To send you updates and other information relating to the service.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">4. Data Security</h2>
                            <p>
                                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">5. Contact Us</h2>
                            <p>
                                If you have questions or comments about this policy, you may email us at <a href="mailto:autosolutions297@gmail.com" className="text-[#6C5CE7] hover:underline">autosolutions297@gmail.com</a>.
                            </p>
                        </section>

                        <div className="pt-10 border-t border-white/10 text-sm italic">
                            Last updated: May 10, 2026
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <WhatsAppFloat />
        </SmoothScroll>
    );
};

export default Privacy;
