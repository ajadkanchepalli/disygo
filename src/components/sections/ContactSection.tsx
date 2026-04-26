'use client';

import { useEffect, useRef, useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setShowModal(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setErrors({});
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus('idle');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(80,229,234,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Success Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-3xl p-10 text-center"
            style={{
              background: '#141414',
              border: '1px solid rgba(80,229,234,0.3)',
              boxShadow: '0 0 60px rgba(80,229,234,0.12)',
              animation: 'modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Animated checkmark */}
            <div
              className="mx-auto mb-6 flex items-center justify-center rounded-full"
              style={{
                width: '72px',
                height: '72px',
                background: 'rgba(80,229,234,0.1)',
                border: '2px solid rgba(80,229,234,0.4)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M6 16L13 23L26 9"
                  stroke="#50e5ea"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 40,
                    strokeDashoffset: 0,
                    animation: 'checkDraw 0.5s 0.2s ease both',
                  }}
                />
              </svg>
            </div>

            <h3
              className="font-montserrat font-bold text-white mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.4rem', fontWeight: 700 }}
            >
              Message Sent!
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}
            >
              Thank you for reaching out! We&apos;ll get back to you within{' '}
              <span style={{ color: '#50e5ea', fontWeight: 600 }}>24 hours</span>.
            </p>
            <button
              onClick={closeModal}
              className="btn-cyan w-full"
              style={{ fontSize: '0.95rem', padding: '14px' }}
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 40; }
          to   { stroke-dashoffset: 0; }
        }
        .field-error {
          font-family: Inter, sans-serif;
          font-size: 0.78rem;
          color: #ff6b6b;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .contact-input-error {
          border-color: rgba(255,107,107,0.5) !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="reveal-left">
            <span className="section-label">Get In Touch</span>
            <h2
              className="font-montserrat font-bold text-white mb-6"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Let&apos;s{' '}
              <span className="gradient-text">Talk</span>
            </h2>

            <p
              className="mb-10"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8,
                maxWidth: '440px',
              }}
            >
              Ready to turn your ideas into impactful digital brands? Let&apos;s discuss your
              project and create something amazing together.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-5">
              <a
                href="tel:9346328498"
                className="flex items-center gap-4 group"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(80,229,234,0.1)',
                    border: '1px solid rgba(80,229,234,0.2)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M16.5 12.5C16.5 12.8 16.43 13.11 16.28 13.41C16.13 13.71 15.94 13.99 15.69 14.25C15.28 14.7 14.83 14.91 14.35 14.91C14.1 14.91 13.83 14.85 13.54 14.72C13.26 14.59 12.96 14.42 12.64 14.2C12.3 13.97 11.98 13.72 11.67 13.44C11.35 13.15 11.05 12.85 10.76 12.53C10.48 12.22 10.23 11.9 10 11.56C9.78 11.24 9.61 10.94 9.48 10.66C9.35 10.37 9.29 10.1 9.29 9.85C9.29 9.61 9.34 9.38 9.44 9.17C9.54 8.95 9.69 8.75 9.9 8.57L10.62 7.85C10.77 7.7 10.9 7.63 11.02 7.63C11.17 7.63 11.3 7.68 11.41 7.78L12.52 8.89C12.63 9 12.68 9.13 12.68 9.28C12.68 9.43 12.63 9.56 12.52 9.67L12.18 10.01C12.12 10.07 12.09 10.14 12.09 10.22C12.09 10.3 12.12 10.37 12.18 10.43L13.57 11.82C13.63 11.88 13.7 11.91 13.78 11.91C13.86 11.91 13.93 11.88 13.99 11.82L14.33 11.48C14.44 11.37 14.57 11.32 14.72 11.32C14.87 11.32 15 11.37 15.11 11.48L16.22 12.59C16.33 12.7 16.38 12.83 16.38 12.98L16.5 12.5Z"
                      fill="#50e5ea"
                    />
                    <path
                      d="M3 1.5H6L7.5 5.25L5.625 6.375C6.45 8.055 7.945 9.55 9.625 10.375L10.75 8.5L14.5 10V13C14.5 13.828 13.828 14.5 13 14.5C6.648 14.5 1.5 9.352 1.5 3C1.5 2.172 2.172 1.5 3 1.5Z"
                      fill="#50e5ea"
                      opacity="0.3"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: '2px',
                    }}
                  >
                    Phone
                  </div>
                  <div
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    +91 93463 28498
                  </div>
                </div>
              </a>

              <a
                href="mailto:disygo.work@gmail.com"
                className="flex items-center gap-4 group"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(80,229,234,0.1)',
                    border: '1px solid rgba(80,229,234,0.2)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="4" width="14" height="10" rx="2" stroke="#50e5ea" strokeWidth="1.5" />
                    <path d="M2 6L9 10.5L16 6" stroke="#50e5ea" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: '2px',
                    }}
                  >
                    Email
                  </div>
                  <div
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    disygo.work@gmail.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(80,229,234,0.1)',
                    border: '1px solid rgba(80,229,234,0.2)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="7" r="3" stroke="#50e5ea" strokeWidth="1.5" />
                    <path
                      d="M3 15C3 12.239 5.686 10 9 10C12.314 10 15 12.239 15 15"
                      stroke="#50e5ea"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: '2px',
                    }}
                  >
                    Location
                  </div>
                  <div
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    Tirupati, Andhra Pradesh
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Follow Us
              </p>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 rounded-full text-xs transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(80,229,234,0.4)';
                      (e.currentTarget as HTMLElement).style.color = '#50e5ea';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-right">
            <div
              className="p-8 rounded-3xl"
              style={{
                background: '#141414',
                border: '1px solid #2a2a2a',
              }}
            >
              <h3
                className="font-montserrat font-bold text-white mb-6"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                }}
              >
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.4)',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`contact-input${errors.name ? ' contact-input-error' : ''}`}
                    />
                    {errors.name && (
                      <p className="field-error">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="6" cy="6" r="5.5" stroke="#ff6b6b" />
                          <path d="M6 3.5V6.5" stroke="#ff6b6b" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="6" cy="8.5" r="0.6" fill="#ff6b6b" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.4)',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.4)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`contact-input${errors.email ? ' contact-input-error' : ''}`}
                  />
                  {errors.email && (
                    <p className="field-error">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="6" cy="6" r="5.5" stroke="#ff6b6b" />
                        <path d="M6 3.5V6.5" stroke="#ff6b6b" strokeWidth="1.2" strokeLinecap="round" />
                        <circle cx="6" cy="8.5" r="0.6" fill="#ff6b6b" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="service"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.4)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="contact-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" style={{ background: '#1a1a1a' }}>Select a service</option>
                    <option value="Social Media Marketing" style={{ background: '#1a1a1a' }}>Social Media Marketing</option>
                    <option value="Lead Generation" style={{ background: '#1a1a1a' }}>Lead Generation</option>
                    <option value="Content Production" style={{ background: '#1a1a1a' }}>Content Production</option>
                    <option value="Web & App Development" style={{ background: '#1a1a1a' }}>Web & App Development</option>
                    <option value="Other" style={{ background: '#1a1a1a' }}>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.4)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className={`contact-input${errors.message ? ' contact-input-error' : ''}`}
                    style={{ resize: 'vertical', minHeight: '100px' }}
                  />
                  {errors.message && (
                    <p className="field-error">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="6" cy="6" r="5.5" stroke="#ff6b6b" />
                        <path d="M6 3.5V6.5" stroke="#ff6b6b" strokeWidth="1.2" strokeLinecap="round" />
                        <circle cx="6" cy="8.5" r="0.6" fill="#ff6b6b" />
                      </svg>
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <div
                    className="px-4 py-3 rounded-xl"
                    style={{
                      background: 'rgba(255,59,59,0.1)',
                      border: '1px solid rgba(255,59,59,0.3)',
                      color: '#ff6b6b',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem',
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-cyan w-full mt-2"
                  style={{
                    fontSize: '0.95rem',
                    padding: '16px',
                    opacity: status === 'loading' ? 0.8 : 1,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}
                      >
                        <circle cx="9" cy="9" r="7" stroke="rgba(0,0,0,0.25)" strokeWidth="2.5" />
                        <path
                          d="M9 2a7 7 0 0 1 7 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
