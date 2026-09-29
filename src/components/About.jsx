import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { designPrinciples } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const principlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // About text entrance
      gsap.fromTo('.about-text-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Image entrance
      gsap.fromTo('.about-image-reveal',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 65%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Principles grid
      gsap.fromTo('.principle-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: principlesRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ background: 'var(--parchment)' }}>
      {/* ===== UPPER ABOUT BLOCK ===== */}
      <div className="about-block-upper">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Text */}
            <div>
              <p className="eyebrow about-text-reveal mb-6">About Studio Eshanya</p>

              <h2
                className="about-text-reveal"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'var(--text-heading)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: '2rem',
                  color: 'var(--charcoal)',
                }}
              >
                A direction.<br />A way of seeing.
              </h2>

              <div style={{ color: 'var(--charcoal)', opacity: 0.85, lineHeight: 1.8 }}>
                <p className="about-text-reveal mb-5" style={{ fontSize: 'var(--text-body)' }}>
                  Eshanya draws from the Sanskrit word associated with the northeastern direction, traditionally symbolising light, clarity, balance and positive beginnings.
                </p>
                <p className="about-text-reveal mb-5" style={{ fontSize: 'var(--text-body)' }}>
                  Established in 2023 by Principal Architect Suhas, Studio Eshanya is an architecture and interior design practice creating thoughtful spaces shaped around people, place and purpose.
                </p>
                <p className="about-text-reveal mb-5" style={{ fontSize: 'var(--text-body)' }}>
                  For us, Eshanya is more than a direction.
                </p>
                <p className="about-text-reveal mb-5" style={{ fontSize: 'var(--text-body)' }}>
                  It is a philosophy that guides how we approach every space.
                </p>
                <div className="about-text-reveal mb-6" style={{ fontSize: 'var(--text-body)', fontWeight: 500, color: 'var(--charcoal)', lineHeight: 1.6 }}>
                  <p style={{ margin: 0, marginBottom: '0.2rem' }}>We design with direction.</p>
                  <p style={{ margin: 0, marginBottom: '0.2rem' }}>We create with purpose.</p>
                  <p style={{ margin: 0 }}>We shape spaces that endure.</p>
                </div>
                <div className="about-text-reveal">
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="cta-link"
                    style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-body)' }}
                  >
                    See What We Do <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Image */}
            <div className="about-image-reveal">
              <div style={{ overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/images/about/about.jpg"
                  alt="Studio Eshanya — Interior Design"
                  className="w-full object-cover"
                  style={{
                    height: 'clamp(400px, 55vw, 620px)',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    pointerEvents: 'none',
                  }}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DESIGN PRINCIPLES GRID ===== */}
      <div
        ref={principlesRef}
        className="about-block-principles"
      >
        <div className="container-main">
          {/* Header */}
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'var(--text-heading)',
              fontWeight: 500,
              lineHeight: 1.15,
              marginBottom: '2rem',
              color: 'var(--charcoal)',
            }}
          >
            A quieter approach to design.
          </h2>

          {/* Quote */}
          <p
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 'var(--text-body)',
              color: 'var(--charcoal)',
              opacity: 0.75,
              marginBottom: '3.5rem',
              maxWidth: '700px',
              lineHeight: 1.6,
            }}
          >
            "Good design does not need to compete for attention. It needs to make a space feel right."
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {designPrinciples.map((p, i) => (
              <div
                key={i}
                className="principle-card"
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                  paddingTop: '1.75rem',
                  paddingRight: i < 3 ? '2rem' : 0,
                  paddingBottom: '2rem',
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'var(--terracotta)',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}>
                  {p.number}
                </span>
                <h4 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                  color: 'var(--charcoal)',
                }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--charcoal)', opacity: 0.75, lineHeight: 1.75 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
