'use client';

import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative"
      style={{
        background: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '80px 0 40px',
      }}
    >
      {/* CTA Banner */}
      <div
        className="max-w-7xl mx-auto px-6 mb-16"
      >
        <div
          className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 100%)',
            border: '1px solid rgba(80,229,234,0.15)',
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(80,229,234,0.06) 0%, transparent 70%)',
            }}
          />

          <p
            className="relative z-10 mb-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Not limited to marketing,
          </p>
          <h3
            className="relative z-10 font-montserrat font-bold text-white mb-4"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            we&apos;re your creative comrades.
          </h3>
          <p
            className="relative z-10 mb-8"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '500px',
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}
          >
            Got a project idea, questions, or just want to say hi? We&apos;re all ears!
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="btn-cyan inline-flex items-center gap-3"
            style={{ fontSize: '0.95rem', padding: '16px 40px' }}
          >
            Let&apos;s Collaborate
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#0d0d0d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/assets/images/Disygo-1777187579051.png"
              alt="Disygo Digital Solutions — Make Your Vision Grow"
              width={140}
              height={56}
              className="object-contain mb-4"
            />
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.8,
                maxWidth: '320px',
              }}
            >
              A results-driven digital marketing agency focused on building strong digital
              presence and generating measurable growth for brands.
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="tel:9346328498"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#50e5ea' }}>📞</span> +91 93463 28498
              </a>
              <a
                href="mailto:disygo.work@gmail.com"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#50e5ea' }}>✉️</span> disygo.work@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p
              className="font-montserrat font-bold text-white mb-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#50e5ea'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p
              className="font-montserrat font-bold text-white mb-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Services
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Social Media Marketing',
                'Lead Generation',
                'Content Production',
                'Web & App Development',
                'Motion Graphics',
              ].map((service) => (
                <span
                  key={service}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            © {currentYear} Disygo Digital Solutions. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            Make Your Vision Grow 🚀
          </p>
        </div>
      </div>
    </footer>
  );
}
