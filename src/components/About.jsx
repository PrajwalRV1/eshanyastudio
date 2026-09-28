import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { designPrinciples } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

// Task 3.2: Replace text block — these are the exact replacement strings
const PHILOSOPHY_LINES = [
  'We design with direction.',
  'We create with purpose.',
  'We shape spaces that endure.',
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const philosophyRef = useRef(null);
  const principlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // About text entrance
      gsap.fromTo('.about-text-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1,
          stagger: 0.15,
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

      // Philosophy text
      gsap.fromTo('.philosophy-line',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 75%',
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
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: '2rem',
                  color: 'var(--charcoal)',
                }}
              >
                A direction.<br />A way of seeing.
              </h2>

              <div style={{ color: 'var(--charcoal)', opacity: 0.8, lineHeight: 1.8 }}>
                <p className="about-text-reveal mb-5" style={{ fontSize: '0.95rem' }}>
                  Eshanya draws from the Sanskrit word associated with the northeastern direction, traditionally symbolising light, clarity, balance and positive beginnings.
                </p>
                <p className="about-text-reveal mb-5" style={{ fontSize: '0.95rem' }}>
                  Established in 2023 by Principal Architect Suhas, Studio Eshanya is an architecture and interior design practice creating thoughtful spaces shaped around people, place and purpose.
                </p>
                <p className="about-text-reveal" style={{ fontSize: '0.95rem' }}>
                  For us, Eshanya is more than a direction.
                </p>
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

      {/* ===== PHILOSOPHY BLOCK (Task 3.2 replacement text) ===== */}
      <div
        ref={philosophyRef}
        className="about-block-philosophy"
      >
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Philosophy Text */}
            <div>
              {/* Task 3.2: REPLACEMENT text block */}
              {PHILOSOPHY_LINES.map((line, i) => (
                <h2
                  key={i}
                  className="philosophy-line"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                    fontWeight: 500,
                    lineHeight: 1.35,
                    marginBottom: '0.25rem',
                    color: 'var(--charcoal)',
                  }}
                >
                  {line}
                </h2>
              ))}

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cta-link philosophy-line"
                style={{ marginTop: '2.5rem', pointerEvents: 'auto' }}
              >
                See What We Do <ArrowRight size={13} />
              </a>
            </div>

            {/* Right — Image (terracotta panel detail) */}
            <div className="about-image-reveal">
              <img
                src="/images/projects/p5/living-detail.png"
                alt="Studio Eshanya — Crafted Detail"
                className="w-full object-cover"
                style={{
                  height: 'clamp(320px, 40vw, 500px)',
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

      {/* ===== DESIGN PRINCIPLES GRID ===== */}
      <div
        ref={principlesRef}
        className="about-block-principles"
      >
        <div className="container-main">
          {/* Quote */}
          <p
            className="philosophy-line"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--charcoal)',
              opacity: 0.65,
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
                <p style={{ fontSize: '0.875rem', color: 'var(--charcoal)', opacity: 0.75, lineHeight: 1.75 }}>
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
