import { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

export default function ProjectDetail({ project, onClose }) {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImg) setLightboxImg(null);
        else onClose();
      }
      if (lightboxImg) {
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxImg, lightboxIndex]);

  const openLightbox = (img, idx) => {
    setLightboxImg(img);
    setLightboxIndex(idx);
  };

  const nextLightbox = () => {
    const next = (lightboxIndex + 1) % project.gallery.length;
    setLightboxIndex(next);
    setLightboxImg(project.gallery[next]);
  };

  const prevLightbox = () => {
    const prev = (lightboxIndex - 1 + project.gallery.length) % project.gallery.length;
    setLightboxIndex(prev);
    setLightboxImg(project.gallery[prev]);
  };

  return (
    <>
      {/* Full-page overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--parchment)',
          zIndex: 2000,
          overflowY: 'auto',
        }}
        ref={modalRef}
      >
        {/* Top Nav */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'rgba(234, 230, 223, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 10,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div className="container-main" style={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={onClose}
              style={{
                pointerEvents: 'auto',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--terracotta)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--charcoal)'}
            >
              <ArrowLeft size={14} /> Back to Selected Works
            </button>

            <button
              onClick={onClose}
              style={{
                pointerEvents: 'auto',
                background: 'transparent',
                border: '1px solid rgba(0,0,0,0.2)',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--charcoal)',
                transition: 'all 0.3s ease',
              }}
              aria-label="Close project view"
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--charcoal)'; }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Project Content */}
        <div className="container-main" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
          {/* Project Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'var(--terracotta)',
                marginBottom: '0.5rem',
              }}>
                Project {String(project.id).padStart(2, '0')}
              </p>
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 500,
                color: 'var(--charcoal)',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}>
                {project.name}
              </h1>
              {/* Metadata */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div>
                  <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>Type</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>{project.type}</p>
                </div>
                <div>
                  <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>Location</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>{project.location}</p>
                </div>
                <div>
                  <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>Year</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>{project.year}</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <p style={{
                fontSize: '1rem',
                color: 'var(--charcoal)',
                opacity: 0.75,
                lineHeight: 1.85,
              }}>
                {project.description}
              </p>
            </div>
          </div>

          <hr className="hairline" style={{ marginBottom: '3rem' }} />

          {/* Hero Image */}
          <div style={{ overflow: 'hidden', marginBottom: '3rem' }}>
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full object-cover"
              style={{
                height: 'clamp(300px, 55vw, 600px)',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
              onContextMenu={e => e.preventDefault()}
            />
          </div>

          {/* Gallery */}
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 500, color: 'var(--charcoal)' }}>
              Project Gallery
            </h2>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--charcoal)',
              opacity: 0.45,
            }}>
              {project.gallery.length} Photographs
            </span>
          </div>

          <hr className="hairline" style={{ marginBottom: '2rem' }} />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.gallery.map((img, idx) => (
              <div
                key={idx}
                style={{ overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                onClick={() => openLightbox(img, idx)}
              >
                <img
                  src={img}
                  alt={`${project.name} — photo ${idx + 1}`}
                  className="w-full object-cover lightbox-trigger"
                  style={{
                    height: '220px',
                    display: 'block',
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    pointerEvents: 'auto',
                  }}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Lightbox */}
      {lightboxImg && (
        <div
          className="lightbox-overlay"
          style={{ zIndex: 3000 }}
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button className="lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close">
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10001,
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <img
            src={lightboxImg}
            alt={`Project photo ${lightboxIndex + 1}`}
            className="lightbox-image"
            onClick={e => e.stopPropagation()}
            onContextMenu={e => e.preventDefault()}
            draggable={false}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10001,
            }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Counter */}
          <div style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            zIndex: 10001,
            pointerEvents: 'none',
          }}>
            {lightboxIndex + 1} / {project.gallery.length}
          </div>
        </div>
      )}
    </>
  );
}
