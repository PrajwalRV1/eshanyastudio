import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="site-footer"
      style={{
        background: 'var(--charcoal)',
        color: 'white',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container-main">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Logo + Social */}
          <div>
            {/* Logo */}
            <div style={{ marginBottom: '1.5rem' }}>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block"
                aria-label="Studio Eshanya Home"
              >
                <img
                  src="/logo-white.png"
                  alt="Studio Eshanya"
                  className="h-9 sm:h-10 w-auto object-contain transition-opacity duration-300 hover:opacity-90"
                  style={{
                    maxHeight: '44px',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    pointerEvents: 'none',
                  }}
                  draggable={false}
                />
              </a>
            </div>

            {/* Studio Info */}
            <div
              style={{
                marginBottom: '1.5rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                lineHeight: 1.65,
                color: 'rgba(255, 255, 255, 0.75)',
              }}
            >
              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.95)', fontWeight: 500 }}>Studio Eshanya</p>
              <p style={{ margin: 0 }}>Architecture &amp; Interior Design Studio</p>
              <p style={{ margin: 0 }}>HSR Layout, Bengaluru, Karnataka</p>
              <p style={{ margin: 0 }}>Serving Bengaluru &amp; surrounding areas</p>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                {
                  href: 'https://instagram.com/studioeshanya', label: 'Instagram',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  )
                },
                {
                  href: 'https://facebook.com/studioeshanya', label: 'Facebook',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )
                },
                {
                  href: 'https://www.linkedin.com/company/studio-eshanya/', label: 'LinkedIn',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )
                },
              ].map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    pointerEvents: 'auto',
                    color: 'rgba(255,255,255,0.55)',
                    transition: 'color 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1.25rem',
            }}>
              Navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {['home', 'about', 'services', 'portfolio', 'contact'].map(id => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    pointerEvents: 'auto',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.75)',
                    transition: 'color 0.3s ease',
                    textTransform: 'capitalize',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 — Contact Info */}
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1.25rem',
            }}>
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href="tel:+919110605559"
                style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              >
                +91 91106 05559
              </a>
              <a
                href="mailto:enquiry.studioeshanya@gmail.com"
                style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s', wordBreak: 'break-all' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              >
                enquiry.studioeshanya@gmail.com
              </a>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                2nd Cross, 21st Main Road,<br />
                1st Sector, HSR Layout,<br />
                Bengaluru, Karnataka 560102
              </p>
            </div>
          </div>

          {/* Col 4 — CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Start a Conversation */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
              className="footer-box"
              style={{ pointerEvents: 'auto', textDecoration: 'none' }}
            >
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                Start a Conversation <ArrowRight size={14} />
              </p>
            </a>

            {/* Task 4.3: Google Reviews image/button */}
            <a
              href="https://share.google/32LC7gIwoCIfUaGIs"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-box"
              style={{ pointerEvents: 'auto', textDecoration: 'none' }}
              aria-label="View all Google reviews for Studio Eshanya"
            >
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '0.4rem',
              }}>
                What Our Clients Say
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {/* Google G logo */}
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'white',
                  }}>
                    View All Reviews on Google
                  </p>
                </div>
                <ArrowRight size={13} style={{ color: 'rgba(255,255,255,0.6)', flexShrink: 0 }} />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          {/* Task 4.3: Updated copyright text */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.04em',
          }}>
            &copy; 2026 Studio Eshanya. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.25)',
          }}>
            Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
