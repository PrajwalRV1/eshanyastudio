import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import BengaluruSection from './components/BengaluruSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LeadGenPopup from './components/LeadGenPopup';

gsap.registerPlugin(ScrollTrigger);

// Global right-click protection for all images
if (typeof window !== 'undefined') {
  // Block context menu on any image or element containing an image
  document.addEventListener('contextmenu', (e) => {
    if (
      e.target.tagName === 'IMG' ||
      e.target.closest('[data-no-context]') ||
      e.target.closest('.portfolio-card') ||
      e.target.closest('.project-slider-overlay') ||
      e.target.closest('.slider-image-area') ||
      e.target.closest('.lightbox-overlay') ||
      e.target.closest('#about') ||
      e.target.closest('#services') ||
      e.target.closest('#portfolio') ||
      e.target.closest('.contact-section') ||
      e.target.closest('.site-footer') ||
      e.target.closest('.hero-section')
    ) {
      e.preventDefault();
    }
  }, true); // capture phase
}

export default function App() {
  const lenisRef = useRef(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove();
    };
  }, []);



  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        {/* "Designed for the way Bengaluru lives" — moved here, after Portfolio */}
        <BengaluruSection />
        {/* Process / How We Work section removed as per request */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <WhatsAppButton />

      {/* Lead Gen Popup — Task 4.2 */}
      <LeadGenPopup />
    </div>
  );
}
