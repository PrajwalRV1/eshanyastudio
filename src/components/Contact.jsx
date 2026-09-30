import { useState, useRef, useEffect } from 'react';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEB3FORMS_ENDPOINT, WEB3FORMS_ACCESS_KEY } from '../config/forms';

gsap.registerPlugin(ScrollTrigger);

// Custom Instagram icon
const InstagramIcon = ({ size = 14, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

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

// ── Sanitize text — strip HTML/script injection
function sanitizeText(val) {
  return val
    .replace(/<[^>]*>/g, '')     // strip HTML tags
    .replace(/[<>"'&]/g, '')     // strip dangerous chars
    .trimStart();
}

// ── Sanitize phone — digits only, max 10
function sanitizePhone(val) {
  return val.replace(/\D/g, '').slice(0, 10);
}

// ── Full form validation
function validateForm(data) {
  const errors = {};
  const name = data.name.trim();
  const phone = data.phone.trim();
  const email = data.email.trim();

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 80) {
    errors.name = 'Name is too long (max 80 characters).';
  }

  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = 'Enter a valid 10-digit phone number.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.projectType) {
    errors.projectType = 'Please select a project type.';
  }

  if (!data.startTimeline) {
    errors.startTimeline = 'Please select a timeline.';
  }

  if (data.message && data.message.length > 1000) {
    errors.message = 'Message must be under 1000 characters.';
  }

  return errors;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    projectType: '', projectLocation: '',
    startTimeline: '', message: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
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

  // Handle regular text fields with sanitization
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = sanitizeText(value);
    setFormData(prev => ({ ...prev, [name]: sanitized }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle phone — digits only, max 10
  const handlePhoneChange = (e) => {
    const digits = sanitizePhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: digits }));
    if (fieldErrors.phone) {
      setFieldErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  // Block non-numeric keys in phone field
  const handlePhoneKeyDown = (e) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End'];
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Block non-numeric paste in phone field
  const handlePhonePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const digits = sanitizePhone(text);
    setFormData(prev => ({ ...prev, phone: digits }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Focus first error field
      const firstKey = Object.keys(errors)[0];
      const idMap = { name: 'contact-name', phone: 'contact-phone', email: 'contact-email', projectType: 'contact-project-type', startTimeline: 'contact-start-timeline', message: 'contact-message' };
      const el = document.getElementById(idMap[firstKey]);
      if (el) el.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Studio Eshanya Enquiry from ${formData.name.trim()} (${formData.projectType || 'Project'})`,
          from_name: 'Studio Eshanya Website',
          name: formData.name.trim(),
          phone: formData.phone,
          email: formData.email.trim(),
          project_type: formData.projectType,
          project_location: formData.projectLocation.trim(),
          start_timeline: formData.startTimeline,
          message: formData.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', projectType: '', projectLocation: '', startTimeline: '', message: '' });
        setFieldErrors({});
      } else {
        setError(data.message || 'Something went wrong. Please email us directly at studioeshanya@gmail.com');
      }
    } catch {
      setError('Something went wrong. Please email us directly at studioeshanya@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  const errStyle = {
    fontSize: '0.68rem',
    color: '#c0392b',
    marginTop: '0.3rem',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0.02em',
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
                fontSize: 'var(--text-heading)',
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
              style={{ fontSize: 'var(--text-body)', color: 'var(--charcoal)', opacity: 0.7, lineHeight: 1.8, marginBottom: '2rem' }}
            >
              Tell us a little about your project and let's begin the conversation.
            </p>

            <hr className="hairline contact-reveal" style={{ marginBottom: '2rem' }} />

            {/* Location */}
            <div className="contact-reveal" style={{ marginBottom: '1.5rem' }}>
              <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>Location</p>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 'var(--text-subheading)', fontWeight: 500, marginBottom: '0.2rem', color: 'var(--charcoal)' }}>
                HSR Layout, Bengaluru
              </p>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--charcoal)', opacity: 0.6, marginBottom: '0.85rem' }}>By Appointment Only</p>
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
              <a
                href="tel:+919110605559"
                style={{
                  pointerEvents: 'auto',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'var(--text-body)',
                  color: 'var(--charcoal)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  opacity: 0.8,
                }}
              >
                <Phone size={14} style={{ color: 'var(--terracotta)', flexShrink: 0 }} />
                +91 91106 05559
              </a>
            </div>

            {/* Email */}
            <div className="contact-reveal" style={{ marginBottom: '1.2rem' }}>
              <p className="eyebrow" style={{ marginBottom: '0.3rem' }}>Email</p>
              <a href="mailto:studioeshanya@gmail.com" style={{ pointerEvents: 'auto', fontSize: 'var(--text-body)', color: 'var(--charcoal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.8 }}>
                <Mail size={14} style={{ color: 'var(--terracotta)' }} />
                studioeshanya@gmail.com
              </a>
            </div>

            {/* Instagram */}
            <div className="contact-reveal">
              <p className="eyebrow" style={{ marginBottom: '0.3rem' }}>Instagram</p>
              <a href="https://instagram.com/studioeshanya" target="_blank" rel="noopener noreferrer" style={{ pointerEvents: 'auto', fontSize: 'var(--text-body)', color: 'var(--charcoal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.8 }}>
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

          {/* RIGHT — Enquiry Form */}
          <div className="contact-reveal">
            {submitted ? (
              <div style={{ padding: '3rem 0', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'var(--text-subheading)', marginBottom: '0.75rem', color: 'var(--charcoal)' }}>
                  Thank you for reaching out.
                </h3>
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--charcoal)', opacity: 0.7, lineHeight: 1.75 }}>
                  We've received your enquiry and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label className="form-label" htmlFor="contact-name">Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      style={fieldErrors.name ? { borderBottomColor: '#c0392b' } : {}}
                      maxLength={80}
                    />
                    {fieldErrors.name && <p style={errStyle}>{fieldErrors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="form-label" htmlFor="contact-phone">
                      Phone *
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="\d{10}"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      onPaste={handlePhonePaste}
                      className="form-input"
                      style={fieldErrors.phone ? { borderBottomColor: '#c0392b' } : {}}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                    />
                    {fieldErrors.phone && <p style={errStyle}>{fieldErrors.phone}</p>}
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
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      style={fieldErrors.email ? { borderBottomColor: '#c0392b' } : {}}
                    />
                    {fieldErrors.email && <p style={errStyle}>{fieldErrors.email}</p>}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="form-label" htmlFor="contact-project-type">Project Type *</label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-input"
                      style={fieldErrors.projectType ? { borderBottomColor: '#c0392b' } : {}}
                    >
                      {PROJECT_TYPES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {fieldErrors.projectType && <p style={errStyle}>{fieldErrors.projectType}</p>}
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
                    maxLength={100}
                  />
                </div>

                {/* Timeline */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="contact-start-timeline">
                    When do you want to start with us? *
                  </label>
                  <select
                    id="contact-start-timeline"
                    name="startTimeline"
                    value={formData.startTimeline}
                    onChange={handleChange}
                    className="form-input"
                    style={fieldErrors.startTimeline ? { borderBottomColor: '#c0392b' } : {}}
                  >
                    {START_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {fieldErrors.startTimeline && <p style={errStyle}>{fieldErrors.startTimeline}</p>}
                </div>

                {/* Message */}
                <div style={{ marginBottom: '2rem' }}>
                  <label className="form-label" htmlFor="contact-message">
                    Message
                    {formData.message.length > 0 && (
                      <span style={{ float: 'right', fontWeight: 400, opacity: 0.5 }}>
                        {formData.message.length}/1000
                      </span>
                    )}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us a little about the space you have in mind."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input"
                    style={{ resize: 'none', lineHeight: 1.7, ...(fieldErrors.message ? { borderBottomColor: '#c0392b' } : {}) }}
                    maxLength={1000}
                  />
                  {fieldErrors.message && <p style={errStyle}>{fieldErrors.message}</p>}
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
