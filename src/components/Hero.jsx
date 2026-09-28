import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { heroSlides } from '../data/projects';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroRef = useRef(null);
  const slideTimerRef = useRef(null);
  const contentRef = useRef(null);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentSlide(index);
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', onComplete: () => setIsTransitioning(false) }
        );
      }
    });
  }, [currentSlide, isTransitioning]);

  useEffect(() => {
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimerRef.current);
  }, []);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px' }}
    >
      {/* Background Images */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === currentSlide ? 1 : 0, zIndex: 0 }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
            draggable={false}
            onContextMenu={e => e.preventDefault()}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.35) 100%)',
            }}
          />
        </div>
      ))}

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.6rem, 1.5vw, 0.9rem)',
          letterSpacing: '0.5em',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.18)',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}>
          STUDIO ESHANYA
        </span>
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-end"
        style={{ zIndex: 3, paddingBottom: '2.5rem' }}
      >
        <div className="container-main">
          {/* Task 3.1: Added subtitle text to home page header */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)',
            letterSpacing: '0.18em',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Architecture &amp; Interior Design Studio, Bengaluru
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                pointerEvents: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                border: '1px solid rgba(255,255,255,0.7)',
                padding: '0.8rem 1.4rem',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'var(--charcoal)';
                e.currentTarget.style.borderColor = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
              }}
            >
              Start a Conversation
              <ArrowRight size={13} />
            </a>

            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                pointerEvents: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.25rem',
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(0,0,0,0.25)',
                backdropFilter: 'blur(6px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
              }}
            >
              Explore Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div
        className="absolute flex items-center gap-2"
        style={{ zIndex: 4, bottom: '2.5rem', right: '2rem' }}
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{ pointerEvents: 'auto', border: 'none', cursor: 'pointer' }}
          />
        ))}
      </div>
    </section>
  );
}
