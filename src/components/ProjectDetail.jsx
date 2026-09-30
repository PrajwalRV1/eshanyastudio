import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Find project by slug, altSlug, or id
  const currentProject = projects.find(
    (p) => p.slug === slug || p.altSlug === slug || String(p.id) === slug
  ) || projects[0];

  const currentIndex = projects.findIndex((p) => p.id === currentProject.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Scroll to top and update dynamic SEO on project switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!currentProject) return;

    const prevTitle = document.title;
    document.title = `${currentProject.name} | ${currentProject.type} in ${currentProject.location} | Studio Eshanya`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', currentProject.description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical ? canonical.getAttribute('href') : '';
    if (canonical) {
      canonical.setAttribute('href', `https://studioeshanya.com/projects/${currentProject.slug}`);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc);
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical);
    };
  }, [currentProject]);

  // Preload next and previous project images in background for instant switching
  useEffect(() => {
    if (!currentProject) return;
    const preload = (src) => {
      if (!src) return;
      const im = new Image();
      im.src = src;
    };

    if (nextProject) {
      preload(nextProject.coverImage);
      if (nextProject.gallery) {
        nextProject.gallery.slice(0, 4).forEach(preload);
      }
    }
    if (prevProject) {
      preload(prevProject.coverImage);
    }
  }, [currentProject, nextProject, prevProject]);

  const openLightbox = (img, idx) => {
    setLightboxImg(img);
    setLightboxIndex(idx);
  };

  const nextLightbox = useCallback(() => {
    if (!currentProject.gallery || currentProject.gallery.length === 0) return;
    const next = (lightboxIndex + 1) % currentProject.gallery.length;
    setLightboxIndex(next);
    setLightboxImg(currentProject.gallery[next]);
  }, [currentProject, lightboxIndex]);

  const prevLightbox = useCallback(() => {
    if (!currentProject.gallery || currentProject.gallery.length === 0) return;
    const prev = (lightboxIndex - 1 + currentProject.gallery.length) % currentProject.gallery.length;
    setLightboxIndex(prev);
    setLightboxImg(currentProject.gallery[prev]);
  }, [currentProject, lightboxIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
      if (lightboxImg) {
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxImg, nextLightbox, prevLightbox]);

  useEffect(() => {
    if (lightboxImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImg]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)' }}>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Project Content */}
      <main key={currentProject.slug} style={{ paddingTop: '7rem', paddingBottom: '6rem' }}>
        <div className="container-main">
          {/* Back to Selected Works link */}
          <div style={{ marginBottom: '2.5rem' }}>
            <Link
              to="/#portfolio"
              style={{
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                opacity: 0.75,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
            >
              <ArrowLeft size={14} /> Back to Selected Works
            </Link>
          </div>

          {/* Project Header (Grid) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            style={{
              marginBottom: '3rem',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid var(--hairline)',
            }}
          >
            <div className="lg:col-span-6">
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '0.9rem',
                  color: 'var(--terracotta)',
                  display: 'block',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.04em',
                }}
              >
                Project {currentProject.number || String(currentProject.id).padStart(2, '0')}
              </span>
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'var(--text-heading)',
                  lineHeight: 1.1,
                  fontWeight: 500,
                  color: 'var(--charcoal)',
                  marginBottom: '1rem',
                }}
              >
                {currentProject.name}
              </h1>

              {/* Project Type & Location */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  marginTop: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                {currentProject.type && (
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem',
                      color: 'var(--charcoal)',
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--terracotta)',
                        marginRight: '0.5rem',
                      }}
                    >
                      Project Type:
                    </span>
                    <span style={{ opacity: 0.85, fontWeight: 400 }}>{currentProject.type}</span>
                  </div>
                )}
                {currentProject.location && (
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem',
                      color: 'var(--charcoal)',
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--terracotta)',
                        marginRight: '0.5rem',
                      }}
                    >
                      Location:
                    </span>
                    <span style={{ opacity: 0.85, fontWeight: 400 }}>{currentProject.location}</span>
                  </div>
                )}
              </div>

              {currentProject.subtitle && (
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    color: 'var(--charcoal)',
                    opacity: 0.6,
                    letterSpacing: '0.03em',
                  }}
                >
                  {currentProject.subtitle}
                </p>
              )}
            </div>

            <div className="lg:col-span-6 flex flex-col justify-end">
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'var(--text-body)',
                  lineHeight: 1.85,
                  color: 'var(--charcoal)',
                  opacity: 0.85,
                }}
              >
                {currentProject.description}
              </p>
            </div>
          </div>

          {/* Cover Feature Banner Image */}
          <div
            style={{
              marginBottom: '4rem',
              overflow: 'hidden',
              border: '1px solid var(--hairline)',
              background: 'rgba(0,0,0,0.05)',
              maxHeight: '680px',
              aspectRatio: '21/10',
            }}
          >
            <img
              key={`cover-${currentProject.slug}`}
              src={currentProject.coverImage}
              alt={`${currentProject.name} — Cover Feature`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              style={{
                display: 'block',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'none',
              }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {/* Project Gallery Header */}
          <div
            style={{
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--hairline)',
              paddingBottom: '1rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'var(--text-subheading)',
                fontWeight: 500,
                color: 'var(--charcoal)',
              }}
            >
              Project Gallery
            </h2>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                opacity: 0.5,
              }}
            >
              {currentProject.gallery?.length || 0} Photographs
            </span>
          </div>

          {/* Masonry / Multi-column Gallery */}
          <div
            key={`gallery-${currentProject.slug}`}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 mb-20 md:mb-28 [column-fill:balance]"
          >
            {currentProject.gallery?.map((img, idx) => (
              <div
                key={`${currentProject.slug}-${idx}`}
                className="group break-inside-avoid mb-6 md:mb-8"
                style={{ overflow: 'hidden' }}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(img, idx)}
                  className="w-full bg-[var(--parchment-light)] border border-[var(--hairline)] transition-opacity duration-300 group-hover:opacity-90 cursor-zoom-in"
                  style={{
                    display: 'block',
                    padding: 0,
                    margin: 0,
                    background: 'transparent',
                    cursor: 'zoom-in',
                    border: '1px solid var(--hairline)',
                    overflow: 'hidden',
                  }}
                  aria-label={`View full image: ${currentProject.name} photo ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${currentProject.name} — view ${idx + 1}`}
                    className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.03]"
                    style={{
                      display: 'block',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                    }}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Project Navigation */}
          <div
            style={{
              borderTop: '1px solid var(--hairline)',
              paddingTop: '2.5rem',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <Link
              to={`/projects/${prevProject.slug}`}
              style={{
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                opacity: 0.8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            >
              <ArrowLeft size={14} /> Previous: {prevProject.name}
            </Link>

            <Link
              to="/#portfolio"
              style={{
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                opacity: 0.65,
                borderBottom: '1px solid rgba(0,0,0,0.3)',
                paddingBottom: '2px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.borderColor = 'var(--charcoal)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.65';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)';
              }}
            >
              All Selected Works
            </Link>

            <Link
              to={`/projects/${nextProject.slug}`}
              style={{
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                opacity: 0.8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            >
              Next: {nextProject.name} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      {/* Lightbox Zoom Viewer */}
      {lightboxImg && (
        <div
          className="lightbox-overlay"
          style={{ zIndex: 3000 }}
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxImg(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              left: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'white',
              cursor: 'pointer',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10001,
              transition: 'background 0.2s',
            }}
            aria-label="Previous image"
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={lightboxImg}
            alt={`${currentProject.name} photo ${lightboxIndex + 1}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              right: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'white',
              cursor: 'pointer',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10001,
              transition: 'background 0.2s',
            }}
            aria-label="Next image"
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          >
            <ChevronRight size={22} />
          </button>

          {/* Counter */}
          <div
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              zIndex: 10001,
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.4)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
            }}
          >
            {lightboxIndex + 1} / {currentProject.gallery?.length || 0}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
