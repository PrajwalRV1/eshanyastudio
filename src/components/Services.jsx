import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-header-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '#services', start: 'top 70%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo('.service-card-reveal',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.18, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.service-cards-grid', start: 'top 75%', toggleActions: 'play none none none' }
        }
      );

      // Location section animation removed — Bengaluru section is now its own component
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ background: 'var(--parchment)' }}>
      <div className="services-block-main">
        <div className="container-main">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            <div>
              <h2
                className="service-header-reveal"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'var(--text-heading)',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'var(--charcoal)',
                }}
              >
                What We Do
              </h2>
              <p
                className="service-header-reveal"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'var(--text-subheading)',
                  color: 'var(--charcoal)',
                  opacity: 0.75,
                }}
              >
                Thoughtful spaces, at every scale.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p
                className="service-header-reveal"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  fontSize: 'var(--text-body)',
                  color: 'var(--charcoal)',
                  opacity: 0.7,
                  lineHeight: 1.75,
                  borderLeft: '2px solid var(--terracotta)',
                  paddingLeft: '1.25rem',
                }}
              >
                "Architecture, interiors and design consultancy — a considered approach to creating spaces that are functional, timeless and deeply personal."
              </p>
            </div>
          </div>

          {/* 3 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 service-cards-grid">
            {services.map((svc) => (
              <div key={svc.id} className="service-card service-card-reveal flex flex-col">
                {/* Image */}
                <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full object-cover"
                    style={{
                      height: 'clamp(180px, 30vw, 260px)',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      pointerEvents: 'none',
                      transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                  />
                </div>

                {/* Number */}
                <span className="card-number" style={{ marginBottom: '0.5rem', display: 'block' }}>
                  {svc.number}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'var(--text-subheading)',
                  fontWeight: 500,
                  marginBottom: '0.35rem',
                  color: 'var(--charcoal)',
                }}>
                  {svc.title}
                </h3>

                {/* Subtitle */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--charcoal)',
                  opacity: 0.55,
                  marginBottom: '0.9rem',
                }}>
                  {svc.subtitle}
                </p>

                <hr className="hairline" style={{ marginBottom: '1rem' }} />

                {/* Description */}
                <p style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--charcoal)',
                  opacity: 0.75,
                  lineHeight: 1.75,
                  flexGrow: 1,
                  marginBottom: '1.25rem',
                }}>
                  {svc.description}
                </p>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cta-link"
                  style={{ pointerEvents: 'auto' }}
                >
                  {svc.cta} <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bengaluru section moved — now lives after Portfolio in App.jsx */}
    </section>
  );
}
