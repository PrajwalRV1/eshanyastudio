import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BengaluruSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bengaluru-reveal',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="location" ref={sectionRef} className="services-block-location">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <div className="bengaluru-reveal" style={{ overflow: 'hidden' }}>
            <img
              src="/images/projects/p7/exterior.png"
              alt="Studio Eshanya — Bengaluru Architecture"
              className="w-full object-cover"
              style={{
                height: 'clamp(380px, 50vw, 580px)',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
              onContextMenu={e => e.preventDefault()}
            />
          </div>

          {/* Right — Text */}
          <div>
            <h2
              className="bengaluru-reveal"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 500,
                lineHeight: 1.25,
                marginBottom: '1.5rem',
                color: 'var(--charcoal)',
              }}
            >
              Designed for the way<br />Bengaluru lives.
            </h2>
            <p
              className="bengaluru-reveal"
              style={{ fontSize: '0.95rem', color: 'var(--charcoal)', opacity: 0.75, lineHeight: 1.85, maxWidth: '440px' }}
            >
              Based in HSR Layout, Bengaluru, Studio Eshanya approaches architecture and interior spaces with a contemporary sensibility grounded in comfort, functionality and thoughtful detail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
