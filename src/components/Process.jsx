import { useEffect, useRef } from 'react';
import { ArrowRight, Compass, Layers, PenTool, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Consultation',
    subtitle: 'Understanding the Brief',
    description: 'We begin with an in-depth conversation exploring your lifestyle, functional needs, spatial aspirations, and budget parameters.',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Concept & Spatial Planning',
    subtitle: 'Layouts & Material Direction',
    description: 'Translating requirements into intelligent floor plans, volumetric layouts, mood boards, and cohesive material palettes tailored to your space.',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Detailing & Documentation',
    subtitle: 'Precision Joinery & MEP',
    description: 'Comprehensive working drawings, joinery specifications, lighting plans, and technical documents ensuring seamless alignment before construction begins.',
    icon: PenTool,
  },
  {
    step: '04',
    title: 'Execution & Handover',
    subtitle: 'Craftsmanship to Completion',
    description: 'Regular site reviews, vendor coordination, finishes calibration, and meticulous styling before final handover of your built space.',
    icon: CheckCircle2,
  },
];

export default function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-header-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo('.process-card-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-steps-grid', start: 'top 80%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="process-section"
      style={{ background: 'var(--parchment-light)', padding: '5.5rem 0' }}
    >
      <div className="container-main">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12 lg:mb-16">
          <div>
            <p className="eyebrow process-header-reveal" style={{ marginBottom: '0.6rem' }}>
              How We Work
            </p>
            <h2
              className="process-header-reveal"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 500,
                color: 'var(--charcoal)',
                lineHeight: 1.2,
              }}
            >
              A considered process,<br />from concept to built form.
            </h2>
          </div>
          <div>
            <p
              className="process-header-reveal"
              style={{
                fontSize: '0.95rem',
                color: 'var(--charcoal)',
                opacity: 0.72,
                lineHeight: 1.8,
                maxWidth: '480px',
              }}
            >
              Every architectural and interior project is shaped by a structured, collaborative journey ensuring clarity, craftsmanship, and peace of mind at every phase.
            </p>
          </div>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 process-steps-grid">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="process-card process-card-reveal"
                style={{
                  background: 'var(--parchment)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '1.75rem 1.5rem',
                  borderRadius: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.35s ease',
                }}
              >
                {/* Step number and icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--terracotta)',
                    }}
                  >
                    {step.step}
                  </span>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(184, 92, 56, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--terracotta)',
                    }}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.15rem',
                    fontWeight: 500,
                    color: 'var(--charcoal)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--terracotta)',
                    marginBottom: '0.85rem',
                  }}
                >
                  {step.subtitle}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--charcoal)',
                    opacity: 0.75,
                    lineHeight: 1.75,
                    flexGrow: 1,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process CTA Footer */}
        <div
          className="process-header-reveal"
          style={{
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--charcoal)', marginBottom: '0.2rem' }}>
              Ready to begin your spatial journey?
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', opacity: 0.65 }}>
              Consultations scheduled in HSR Layout, Bengaluru or via direct video walkthrough.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cta-link"
            style={{ pointerEvents: 'auto', fontSize: '0.75rem', fontWeight: 600 }}
          >
            Start Your Consultation <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
