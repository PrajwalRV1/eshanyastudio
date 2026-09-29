import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Update active section
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      if (mobileMenuRef.current) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, x: '100%' },
          { opacity: 1, x: '0%', duration: 0.35, ease: 'power3.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{
          background: scrolled
            ? 'rgba(26, 26, 26, 0.97)'
            : 'rgba(26, 26, 26, 0.35)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="container-main">
          <div className="flex items-center justify-between py-1.5 sm:py-2">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex-shrink-0 block"
              style={{ pointerEvents: 'auto' }}
              aria-label="Studio Eshanya Home"
            >
              <img
                src="/logo-white.png"
                alt="Studio Eshanya"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-opacity duration-300 hover:opacity-90"
                style={{
                  maxHeight: '52px',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  pointerEvents: 'none',
                }}
                draggable={false}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social Icons — Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://instagram.com/studioeshanya"
                target="_blank"
                rel="noopener noreferrer"
                style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.75)', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/studioeshanya"
                target="_blank"
                rel="noopener noreferrer"
                style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.75)', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/studio-eshanya/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.75)', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ pointerEvents: 'auto', background: 'transparent', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 flex flex-col justify-between"
          style={{
            background: 'rgba(18, 18, 18, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            paddingTop: '5.5rem',
            paddingBottom: '2.5rem',
            overflowY: 'auto',
          }}
        >
          <div className="container-main flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  pointerEvents: 'auto',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.5rem, 5vw, 1.85rem)',
                  color: activeSection === link.href.replace('#', '') ? 'var(--terracotta)' : 'white',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.85rem',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: '0.9rem', opacity: 0.35 }}>→</span>
              </a>
            ))}
          </div>

          {/* Quick contact info in mobile drawer */}
          <div className="container-main pt-6">
            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--terracotta)',
                marginBottom: '0.35rem',
              }}>
                Studio Eshanya
              </p>
              <a
                href="tel:+919110605559"
                style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '1.15rem',
                  fontFamily: 'Playfair Display, serif',
                  textDecoration: 'none',
                  marginBottom: '0.3rem',
                }}
              >
                +91 91106 05559
              </a>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>
                HSR Layout, Bengaluru
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
