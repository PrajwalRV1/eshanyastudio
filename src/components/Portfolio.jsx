import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.portfolio-header-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.portfolio-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{
        background: 'var(--parchment)',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      <div className="container-main">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h2
            className="portfolio-header-reveal"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'var(--text-heading)',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '0.04em',
              color: 'var(--charcoal)',
              marginBottom: '0.75rem',
            }}
          >
            Selected Works
          </h2>

          <p
            className="portfolio-header-reveal"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'var(--text-subheading)',
              fontWeight: 400,
              color: 'var(--charcoal)',
              opacity: 0.85,
            }}
          >
            Spaces Shaped With Purpose
          </p>
        </div>

        {/* Grid — responsive: 2 cols on mobile, 2 on sm/md, 4 on lg+ */}
        <div className="portfolio-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="portfolio-card block"
              style={{
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'block',
              }}
            >
              {/* Image */}
              <div
                className="card-image-wrapper"
                style={{
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '0.75rem',
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src={project.coverImage}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover lightbox-trigger"
                  style={{
                    display: 'block',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    pointerEvents: 'auto',
                  }}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Hover overlay */}
                <div
                  className="card-overlay absolute inset-0 flex items-center justify-center"
                  style={{ transition: 'background 0.4s ease' }}
                >
                  {/* View indicator on hover */}
                  <span className="card-view-hint">View Project</span>
                </div>
                {/* Ongoing badge */}
                {project.status === 'ongoing' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.6rem',
                      left: '0.6rem',
                      background: 'var(--terracotta)',
                      color: 'white',
                      fontSize: '0.55rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Ongoing
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div>
                {/* Type + Location */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.4rem',
                    marginBottom: '0.3rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.58rem',
                      fontWeight: 500,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: 'var(--terracotta)',
                    }}
                  >
                    {project.type}
                  </span>
                  <span
                    style={{ color: 'rgba(0,0,0,0.2)', fontSize: '0.58rem' }}
                  >
                    |
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.58rem',
                      fontWeight: 400,
                      color: 'var(--charcoal)',
                      opacity: 0.5,
                    }}
                  >
                    {project.location}
                  </span>
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'var(--text-subheading)',
                    fontWeight: 500,
                    color: 'var(--charcoal)',
                    lineHeight: 1.25,
                    marginBottom: '0.4rem',
                  }}
                >
                  {project.name}
                </h3>

                {/* View link */}
                <span
                  className="cta-link"
                  style={{
                    pointerEvents: 'auto',
                    fontSize: '0.68rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  View Project <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
