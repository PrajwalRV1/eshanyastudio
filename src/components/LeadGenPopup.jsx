import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { WEB3FORMS_ENDPOINT, WEB3FORMS_ACCESS_KEY } from '../config/forms';

const DELAY_MS = 12000; // 12 seconds
const STORAGE_KEY = 'eshanya_popup_shown';

function sanitizeText(val) {
  return val
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'&]/g, '')
    .trimStart();
}

function sanitizePhone(val) {
  return val.replace(/\D/g, '').slice(0, 10);
}

function validatePopupForm(data) {
  const errors = {};

  // Name
  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
    errors.name = 'Name can only contain letters and spaces.';
  }

  // Phone: Indian mobile — exactly 10 digits starting with 6-9
  const phone = data.phone.trim();
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number.';
  } else if (!/^[6-9]/.test(phone)) {
    errors.phone = 'Mobile number must start with 6, 7, 8, or 9.';
  }

  // Email
  const email = data.email.trim();
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Interest
  if (!data.interest) {
    errors.interest = 'Please select a service interest.';
  }

  return errors;
}

export default function LeadGenPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', interest: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setDismissed(true);
  };

  useEffect(() => {
    // Don't show again if already shown this session
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      if (!dismissed) {
        setVisible(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');
      }
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [dismissed]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    if (visible) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanVal = value;
    if (name === 'name') cleanVal = sanitizeText(value);
    setFormData(prev => ({ ...prev, [name]: cleanVal }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePhoneChange = (e) => {
    const digits = sanitizePhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: digits }));
    if (fieldErrors.phone) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePopupForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Studio Eshanya Consultation Request from ${formData.name.trim()}`,
          from_name: 'Studio Eshanya Popup',
          name: formData.name.trim(),
          phone: formData.phone,
          email: formData.email.trim(),
          interest: formData.interest,
          source: 'popup',
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => handleClose(), 2500);
      } else {
        setSubmitted(true);
        setTimeout(() => handleClose(), 2500);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) return null;

  const errStyle = {
    fontSize: '0.68rem',
    color: '#c0392b',
    marginTop: '0.25rem',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        className="modal-card"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ marginBottom: '1rem' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'var(--text-subheading)', marginBottom: '0.5rem', color: 'var(--charcoal)' }}>
              Thank you!
            </h3>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--charcoal)', opacity: 0.7 }}>
              We'll be in touch with you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Eyebrow */}
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Thinking about a new space?</p>

            {/* Heading */}
            <h2
              id="popup-title"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'var(--text-subheading)',
                fontWeight: 500,
                lineHeight: 1.25,
                marginBottom: '0.6rem',
                color: 'var(--charcoal)',
              }}
            >
              Let's shape your space together.
            </h2>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--charcoal)', opacity: 0.65, marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Share your details and we'll reach out to understand your vision.
            </p>

            <hr className="hairline" style={{ marginBottom: '1.75rem' }} />

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label" htmlFor="popup-name">Name *</label>
                  <input
                    id="popup-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    style={fieldErrors.name ? { borderBottomColor: '#c0392b' } : {}}
                    maxLength={80}
                  />
                  {fieldErrors.name && <p style={errStyle}>{fieldErrors.name}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="popup-phone">Phone *</label>
                  <input
                    id="popup-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="form-input"
                    style={fieldErrors.phone ? { borderBottomColor: '#c0392b' } : {}}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                  />
                  {fieldErrors.phone && <p style={errStyle}>{fieldErrors.phone}</p>}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" htmlFor="popup-email">Email *</label>
                <input
                  id="popup-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  style={fieldErrors.email ? { borderBottomColor: '#c0392b' } : {}}
                />
                {fieldErrors.email && <p style={errStyle}>{fieldErrors.email}</p>}
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label className="form-label" htmlFor="popup-interest">I'm interested in *</label>
                <select
                  id="popup-interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="form-input"
                  style={fieldErrors.interest ? { borderBottomColor: '#c0392b' } : {}}
                >
                  <option value="">Select one</option>
                  <option value="architecture">Architecture</option>
                  <option value="interior-design">Interior Design</option>
                  <option value="design-consultancy">Design Consultancy</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
                {fieldErrors.interest && <p style={errStyle}>{fieldErrors.interest}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  pointerEvents: 'auto',
                  width: '100%',
                  background: 'var(--charcoal)',
                  color: 'white',
                  border: 'none',
                  padding: '0.9rem 2rem',
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
                {submitting ? 'Sending...' : <><span>Get in Touch</span> <ArrowRight size={14} /></>}
              </button>

              <p style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--charcoal)', opacity: 0.4 }}>
                We'll never share your details with third parties.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
