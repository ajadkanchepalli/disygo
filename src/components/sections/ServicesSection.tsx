'use client';

import { useEffect, useRef } from 'react';

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

const services: Service[] = [
  {
    title: 'Social Media Marketing',
    description:
      'Grow brand awareness and engagement through strategic content, targeted campaigns, and data-driven social media management across all platforms.',
    icon: '📱',
    features: ['Content Strategy', 'Community Management', 'Paid Campaigns', 'Analytics & Reporting'],
    color: '#50e5ea',
  },
  {
    title: 'Lead Generation',
    description:
      'Performance marketing campaigns designed to generate qualified leads and real business results through precision targeting and conversion optimization.',
    icon: '🎯',
    features: ['Meta Ads', 'Google Ads', 'Funnel Design', 'Conversion Tracking'],
    color: '#50e5ea',
  },
  {
    title: 'Content Production',
    description:
      'High-quality reels, brand videos, motion graphics, and visual storytelling that captivates your audience and elevates your brand identity.',
    icon: '🎬',
    features: ['Reels & Short Videos', 'Motion Graphics', 'Brand Visuals', 'Poster Design'],
    color: '#50e5ea',
  },
  {
    title: 'Web & App Development',
    description:
      'Modern, fast, and conversion-focused websites and mobile applications built with cutting-edge technology for maximum performance.',
    icon: '💻',
    features: ['Website Design', 'App Development', 'UI/UX Design', 'SEO Optimization'],
    color: '#50e5ea',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #111111 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(80,229,234,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="section-label">What We Do</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-montserrat font-bold text-white"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                maxWidth: '500px',
              }}
            >
              From Concept{' '}
              <span className="gradient-text">To Creation</span>
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '360px',
                lineHeight: 1.7,
              }}
            >
              Your Vision, Our Expertise. Together, we bring ideas to life with tailored
              solutions that deliver real results.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`service-card reveal delay-${(i + 1) * 100}`}
            >
              {/* Icon */}
              <div className="icon-wrap">
                <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
              </div>

              {/* Number */}
              <div
                className="absolute top-6 right-6 font-montserrat font-black"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: 'rgba(80,229,234,0.06)',
                  lineHeight: 1,
                }}
              >
                0{i + 1}
              </div>

              {/* Title */}
              <h3
                className="font-montserrat font-bold text-white mb-3"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="mb-6"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.7,
                }}
              >
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: 'rgba(80,229,234,0.08)',
                      border: '1px solid rgba(80,229,234,0.15)',
                      color: 'rgba(80,229,234,0.8)',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    {feat}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div
                className="mt-6 flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#50e5ea',
                }}
              >
                <span>Learn More</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="#50e5ea"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
