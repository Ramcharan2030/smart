import React, { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import SmoothScroll from "@/components/site/SmoothScroll";

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <SmoothScroll>
            <Navbar />
            <div className="relative bg-as-bg text-as-ink pt-32 pb-20 min-h-screen">
                {/* subtle violet glow */}
                <div
                    className="as-blob fixed"
                    style={{
                        width: 600,
                        height: 600,
                        background: "rgba(108,92,231,0.3)",
                        bottom: -200,
                        left: -100,
                        opacity: 0.15,
                        zIndex: 0,
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
                    <p className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--as-violet)] mb-4">
                        Legal
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-10 leading-[1.1]">
                        Terms of Service
                    </h1>

                    <div className="space-y-10 text-as-ink/70 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-as-ink mb-4">1. Agreement to Terms</h2>
                            <p>
                                By accessing or using the services provided by AutoSolutions.in, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you are prohibited from using the site and our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-as-ink mb-4">2. Use License</h2>
                            <p>
                                Permission is granted to temporarily use the services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                <li>Modify or copy the materials.</li>
                                <li>Use the materials for any commercial purpose.</li>
                                <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
                                <li>Remove any copyright or other proprietary notations from the materials.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-as-ink mb-4">3. Disclaimer</h2>
                            <p>
                                The materials on AutoSolutions.in's website are provided on an 'as is' basis. AutoSolutions.in makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-as-ink mb-4">4. Limitations</h2>
                            <p>
                                In no event shall AutoSolutions.in or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-as-ink mb-4">5. Governing Law</h2>
                            <p>
                                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                            </p>
                        </section>

                        <div className="pt-10 border-t border-as-border text-sm italic">
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

export default Terms;
