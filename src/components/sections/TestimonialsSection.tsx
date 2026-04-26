'use client';

import { useEffect, useRef } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Ravi Kumar',
    role: 'Owner',
    company: "Tirupati's Most Beautiful Cafe",
    text: 'Disygo transformed our cafe brand completely. Their social media strategy brought us 3x more footfall within 2 months. The content quality is exceptional — every reel they produced went viral on Instagram.',
    initials: 'RK',
    color: '#50e5ea',
  },
  {
    name: 'Priya Sharma',
    role: 'Founder',
    company: 'Motivation Books',
    text: 'Working with Disygo was a game-changer for our book brand. Their visual storytelling approach helped us connect with our audience on a deeper level. Sales increased by 40% after their campaign.',
    initials: 'PS',
    color: '#7aeef2',
  },
  {
    name: 'Arjun Reddy',
    role: 'Director',
    company: 'Nail Craft Studio',
    text: 'The team at Disygo understood our brand vision perfectly. The posters and reels they created are stunning — our Instagram following grew from 500 to 8,000 in just 3 months!',
    initials: 'AR',
    color: '#2ec8cd',
  },
  {
    name: 'Meera Patel',
    role: 'CEO',
    company: 'LoveOn Click Photography',
    text: 'Professional, creative, and results-driven. Disygo built our entire digital presence from scratch. Our website now generates consistent leads and the content they produce is world-class.',
    initials: 'MP',
    color: '#50e5ea',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #111111 100%)' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(80,229,234,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="section-label">Client Stories</span>
          <h2
            className="font-montserrat font-bold text-white"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            What Our Clients{' '}
            <span className="gradient-text">Have to Say</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div ref={trackRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`testimonial-card reveal-scale delay-${(i + 1) * 100}`}
            >
              {/* Quote mark */}
              <div
                className="mb-4"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '4rem',
                  lineHeight: 0.8,
                  color: 'rgba(80,229,234,0.2)',
                  fontWeight: 900,
                }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} width="14" height="14" viewBox="0 0 14 14" fill="#50e5ea">
                    <path d="M7 0L8.5 5H14L9.5 8L11 13L7 10L3 13L4.5 8L0 5H5.5L7 0Z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p
                className="mb-6"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                }}
              >
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${t.color}22`,
                    border: `1px solid ${t.color}44`,
                    color: t.color,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {t.role} — {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
