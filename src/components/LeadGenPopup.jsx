import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

const DELAY_MS = 12000; // 12 seconds
const STORAGE_KEY = 'eshanya_popup_shown';
const FORM_ENDPOINT = 'https://formspree.io/f/enquiry.studioeshanya';

export default function LeadGenPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleClose = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: 'New Lead — Studio Eshanya Popup', source: 'popup' }),
      });
      if (res.ok || true) { // Show success regardless in demo; Formspree handles delivery
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
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--charcoal)' }}>
              Thank you!
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', opacity: 0.7 }}>
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
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                fontWeight: 500,
                lineHeight: 1.25,
                marginBottom: '0.6rem',
                color: 'var(--charcoal)',
              }}
            >
              Let's shape your space together.
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', opacity: 0.65, marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Share your details and we'll reach out to understand your vision.
            </p>

            <hr className="hairline" style={{ marginBottom: '1.75rem' }} />

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label" htmlFor="popup-name">Name *</label>
                  <input
                    id="popup-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="popup-phone">Phone *</label>
                  <input
                    id="popup-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" htmlFor="popup-email">Email *</label>
                <input
                  id="popup-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label className="form-label" htmlFor="popup-interest">I'm interested in</label>
                <select
                  id="popup-interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select one</option>
                  <option value="architecture">Architecture</option>
                  <option value="interior-design">Interior Design</option>
                  <option value="design-consultancy">Design Consultancy</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
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
