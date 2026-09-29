import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

// ─── Project Image Slider Modal ──────────────────────────────────────────────
function ProjectSlider({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const imgRef = useRef(null);
  const touchStartX = useRef(null);

  // All images: unique list of cover + gallery
  const allImages = Array.from(new Set([project.coverImage, ...(project.gallery || [])]));
  const total = allImages.length;

  const goTo = useCallback((idx, dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const el = imgRef.current;
    if (el) {
      gsap.to(el, {
        opacity: 0,
        x: dir === 'next' ? -30 : 30,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setCurrent(idx);
          gsap.fromTo(el,
            { opacity: 0, x: dir === 'next' ? 30 : -30 },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out', onComplete: () => setIsAnimating(false) }
          );
        }
      });
    } else {
      setCurrent(idx);
      setIsAnimating(false);
    }
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + total) % total, 'prev');
  const next = () => goTo((current + 1) % total, 'next');

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, isAnimating]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  return (
    <div
      className="project-slider-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — Image Gallery`}
    >
      {/* Modal panel — stop propagation so clicking inside doesn't close */}
      <div
        className="project-slider-panel"
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Close button */}
        <button className="slider-close-btn" onClick={onClose} aria-label="Close gallery">
          <X size={18} />
        </button>

        {/* Image area */}
        <div
          className="slider-image-area"
          style={{
            flex: '1 1 0%',
            height: 0,
            minHeight: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            ref={imgRef}
            key={current}
            src={allImages[current]}
            alt={`${project.name} — image ${current + 1}`}
            className="slider-main-image"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
            draggable={false}
            onContextMenu={e => e.preventDefault()}
          />

          {/* Prev */}
          {total > 1 && (
            <button className="slider-nav-btn slider-nav-prev" onClick={prev} aria-label="Previous image">
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next */}
          {total > 1 && (
            <button className="slider-nav-btn slider-nav-next" onClick={next} aria-label="Next image">
              <ChevronRight size={20} />
            </button>
          )}

          {/* Counter */}
          <div className="slider-counter">
            {current + 1} / {total}
          </div>
        </div>

        {/* Info bar */}
        <div className="slider-info-bar">
          {/* Top row: meta tags | project name | dots */}
          <div className="slider-info-left">
            <span className="slider-type-tag">{project.type}</span>
            <span className="slider-location">{project.location}</span>
            {project.status === 'ongoing' && (
              <span className="slider-ongoing-badge">Ongoing</span>
            )}
          </div>
          <h3 className="slider-project-name">{project.name}</h3>

          {/* Dot indicators */}
          {total > 1 && (
            <div className="slider-dots">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  className={`slider-indicator-dot ${i === current ? 'active' : ''}`}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Description — bottom-left */}
          {project.description && (
            <p className="slider-description">{project.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Portfolio Grid ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-header-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '#portfolio', start: 'top 70%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo('.portfolio-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-grid', start: 'top 75%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Block right-click on section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prevent = (e) => e.preventDefault();
    section.addEventListener('contextmenu', prevent);
    return () => section.removeEventListener('contextmenu', prevent);
  }, []);

  return (
    <>
      <section id="portfolio" ref={sectionRef} className="portfolio-section">
        <div className="container-main">
          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              className="portfolio-header-reveal"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
                fontWeight: 500,
                marginBottom: '0.6rem',
                color: 'var(--charcoal)',
              }}
            >
              Selected Works
            </h2>
            <p
              className="portfolio-header-reveal"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(0.88rem, 2vw, 1.05rem)',
                color: 'var(--charcoal)',
                opacity: 0.6,
              }}
            >
              A collection of spaces shaped around place, people and purpose.
            </p>
          </div>

          {/* Grid — responsive: 2 cols on mobile, 2 on sm/md, 4 on lg+ */}
          <div className="portfolio-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="portfolio-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveProject(project)}
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
                    className="w-full h-full object-cover lightbox-trigger"
                    style={{
                      display: 'block',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      pointerEvents: 'auto',
                    }}
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                  />
                  {/* Hover overlay */}
                  <div
                    className="card-overlay absolute inset-0 flex items-center justify-center"
                    style={{ transition: 'background 0.4s ease' }}
                  >
                    {/* View indicator on hover */}
                    <span className="card-view-hint">
                      View Gallery
                    </span>
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
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.3rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.58rem',
                      fontWeight: 500,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: 'var(--terracotta)',
                    }}>
                      {project.type}
                    </span>
                    <span style={{ color: 'rgba(0,0,0,0.2)', fontSize: '0.58rem' }}>|</span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.58rem',
                      fontWeight: 400,
                      color: 'var(--charcoal)',
                      opacity: 0.5,
                    }}>
                      {project.location}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(0.88rem, 2vw, 1.05rem)',
                    fontWeight: 500,
                    color: 'var(--charcoal)',
                    lineHeight: 1.25,
                    marginBottom: '0.4rem',
                  }}>
                    {project.name}
                  </h3>

                  {/* View link */}
                  <button
                    className="cta-link"
                    style={{ pointerEvents: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.68rem' }}
                    onClick={() => setActiveProject(project)}
                  >
                    View Gallery <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Image Slider Modal */}
      {activeProject && (
        <ProjectSlider
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
