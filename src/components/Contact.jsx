import { useState, useRef, useEffect } from 'react';
import { ArrowRight, X, MapPin, Phone, Mail } from 'lucide-react';

// Custom Instagram icon (lucide-react older versions may not include it)
const InstagramIcon = ({ size = 14, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Task 4.1: Dropdown options
const START_OPTIONS = [
  { value: '', label: 'Select one' },
  { value: 'immediate', label: 'i. Immediate' },
  { value: '1-month', label: 'ii. 1 month' },
  { value: '3-months', label: 'iii. 3 months' },
  { value: '6-months', label: 'iv. 6 months' },
  { value: 'after-12-months', label: 'v. After 12 months' },
];

const PROJECT_TYPES = [
  { value: '', label: 'Select one' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'interior-design', label: 'Interior Design' },
  { value: 'design-consultancy', label: 'Design Consultancy' },
  { value: 'other', label: 'Other' },
];

const FORM_ENDPOINT = 'https://formspree.io/f/enquiry.studioeshanya';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    projectType: '', projectLocation: '',
    startTimeline: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '#contact', start: 'top 70%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      // Send to Formspree (or Netlify Forms)
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', projectType: '', projectLocation: '', startTimeline: '', message: '' });
      } else {
        setError('Something went wrong. Please email us directly at enquiry.studioeshanya@gmail.com');
      }
    } catch {
      setError('Something went wrong. Please email us directly at enquiry.studioeshanya@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* LEFT — Contact Info */}
          <div>
            <h2
              className="contact-reveal"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 500,
                lineHeight: 1.2,
                marginBottom: '1rem',
                color: 'var(--charcoal)',
              }}
            >
              Have a space<br />in mind?
            </h2>
            <p
              className="contact-reveal"
              style={{ fontSize: '0.9rem', color: 'var(--charcoal)', opacity: 0.7, lineHeight: 1.8, marginBottom: '2rem' }}
            >
              Tell us a little about your project and let's begin the conversation.
            </p>

            <hr className="hairline contact-reveal" style={{ marginBottom: '2rem' }} />

            {/* Location */}
            <div className="contact-reveal" style={{ marginBottom: '1.5rem' }}>
              <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>Location</p>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.2rem', color: 'var(--charcoal)' }}>
                HSR Layout, Bengaluru
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal)', opacity: 0.6, marginBottom: '0.85rem' }}>By Appointment Only</p>
              <a
                href="https://maps.google.com/?q=Studio+Eshanya+HSR+Layout+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  pointerEvents: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid var(--charcoal)',
                  padding: '0.55rem 1rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--charcoal)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--charcoal)'; }}
              >
                <MapPin size={12} /> Get Directions
              </a>
            </div>

            {/* Direct Line */}
            <div className="contact-reveal" style={{ marginBottom: '1.2rem' }}>
              <p className="eyebrow" style={{ marginBottom: '0.3rem' }}>Direct Line</p>
              <a href="tel:+919110605559" style={{ pointerEvents: 'auto', fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--charcoal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} style={{ color: 'var(--terracotta)' }} />
                +91 91106 05559
              </a>
            </div>

            {/* Email */}
            <div className="contact-reveal" style={{ marginBottom: '1.2rem' }}>
              <p className="eyebrow" style={{ marginBottom: '0.3rem' }}>Email</p>
              <a href="mailto:enquiry.studioeshanya@gmail.com" style={{ pointerEvents: 'auto', fontSize: '0.875rem', color: 'var(--charcoal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.8 }}>
                <Mail size={14} style={{ color: 'var(--terracotta)' }} />
                enquiry.studioeshanya@gmail.com
              </a>
            </div>

            {/* Instagram */}
            <div className="contact-reveal">
              <p className="eyebrow" style={{ marginBottom: '0.3rem' }}>Instagram</p>
              <a href="https://instagram.com/studioeshanya" target="_blank" rel="noopener noreferrer" style={{ pointerEvents: 'auto', fontSize: '0.875rem', color: 'var(--charcoal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.8 }}>
                <InstagramIcon size={14} style={{ color: 'var(--terracotta)' }} />
                @studioeshanya
              </a>
            </div>
          </div>

          {/* CENTER — Image + Map */}
          <div className="contact-reveal hidden lg:block">
            <img
              src="/images/contact/contact.png"
              alt="Studio Eshanya Office"
              className="w-full object-cover mb-4"
              style={{
                height: '260px',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
              onContextMenu={e => e.preventDefault()}
            />
            <iframe
              title="Studio Eshanya Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.836019999!2d77.6389!3d12.9116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzQxLjgiTiA3N8KwMzgnMjAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 'none', display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* RIGHT — Contact Form */}
          <div className="contact-reveal">
            {submitted ? (
              <div style={{ padding: '3rem 0', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--charcoal)' }}>
                  Thank you for reaching out.
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--charcoal)', opacity: 0.7, lineHeight: 1.75 }}>
                  We've received your enquiry and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label className="form-label" htmlFor="contact-name">Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="form-label" htmlFor="contact-phone">Phone *</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {/* Email */}
                  <div>
                    <label className="form-label" htmlFor="contact-email">Email *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  {/* Project Type */}
                  <div>
                    <label className="form-label" htmlFor="contact-project-type">Project Type *</label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      {PROJECT_TYPES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Location */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="contact-location">Project Location</label>
                  <input
                    id="contact-location"
                    name="projectLocation"
                    type="text"
                    placeholder="e.g. HSR Layout, Bengaluru"
                    value={formData.projectLocation}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Task 4.1: New "When do you want to start?" dropdown */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="contact-timeline">
                    When do you want to start with us? *
                  </label>
                  <select
                    id="contact-timeline"
                    name="startTimeline"
                    required
                    value={formData.startTimeline}
                    onChange={handleChange}
                    className="form-input"
                  >
                    {START_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '2rem' }}>
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us a little about the space you have in mind."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input"
                    style={{ resize: 'none', lineHeight: 1.7 }}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: '0.8rem', color: '#c0392b', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    pointerEvents: 'auto',
                    width: '100%',
                    background: 'var(--charcoal)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.3s ease',
                    opacity: submitting ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = 'var(--terracotta)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--charcoal)'; }}
                >
                  {submitting ? 'Sending...' : (
                    <><span>Send Enquiry</span> <ArrowRight size={14} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
