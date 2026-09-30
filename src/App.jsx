import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import ProjectDetail from './components/ProjectDetail';

gsap.registerPlugin(ScrollTrigger);

// Global right-click protection for all images
if (typeof window !== 'undefined') {
  document.addEventListener(
    'contextmenu',
    (e) => {
      if (
        e.target.tagName === 'IMG' ||
        e.target.closest('[data-no-context]') ||
        e.target.closest('.portfolio-card') ||
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
    },
    true
  );
}

// Scroll restoration and hash scrolling helper
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const scrollToEl = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      if (!scrollToEl()) {
        const timer1 = setTimeout(scrollToEl, 80);
        const timer2 = setTimeout(scrollToEl, 250);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
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
        <BengaluruSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <WhatsAppButton />

      {/* Lead Gen Popup */}
      <LeadGenPopup />
    </div>
  );
}

export default function App() {
  const lenisRef = useRef(null);

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
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        {/* Fallback to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
