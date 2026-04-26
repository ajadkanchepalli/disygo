'use client';

import { useEffect, useRef } from 'react';

const stats = [
  { value: '600+', label: 'Projects Completed', icon: '🚀' },
  { value: '99%', label: 'Satisfaction Rate', icon: '⭐' },
  { value: '3+', label: 'Years of Experience', icon: '🏆' },
];

const softwareStack = [
  { name: 'After Effects', abbr: 'Ae', color: '#9999FF' },
  { name: 'Premiere Pro', abbr: 'Pr', color: '#9999FF' },
  { name: 'Photoshop', abbr: 'Ps', color: '#31A8FF' },
  { name: 'Lightroom', abbr: 'Lr', color: '#31A8FF' },
  { name: 'Illustrator', abbr: 'Ai', color: '#FF9A00' },
  { name: 'Canva', abbr: 'Ca', color: '#00C4CC' },
  { name: 'Meta Ads', abbr: 'M', color: '#1877F2' },
  { name: 'Google Ads', abbr: 'G', color: '#4285F4' },
  { name: 'CapCut', abbr: 'CC', color: '#ffffff' },
  { name: 'ChatGPT', abbr: 'AI', color: '#10a37f' },
];

const marqueeItems = [
  'Social Media Marketing',
  'Lead Generation',
  'Content Production',
  'Web Development',
  'Motion Graphics',
  'Brand Strategy',
  'Digital Growth',
  'Visual Storytelling',
];

export default function StatsSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* Top divider */}
      <div className="h-line mb-0" />
      {/* Stats Bar */}
      <div
        className="max-w-7xl mx-auto px-6 py-16"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {stats?.map((stat, i) => (
            <div
              key={stat?.label}
              className={`reveal stat-card delay-${(i + 1) * 100}`}
              style={{
                borderRight: i < stats?.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <div
                className="font-montserrat font-black mb-2 gradient-text"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1,
                }}
              >
                {stat?.value}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.05em',
                }}
              >
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Software Stack */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="reveal mb-10">
          <span className="section-label">Our Toolkit</span>
          <h2
            className="font-montserrat font-bold text-white"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
            }}
          >
            Powered by Industry-Leading Software
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {softwareStack?.map((sw, i) => (
            <div
              key={sw?.name}
              className={`software-badge reveal delay-${Math.min((i + 1) * 100, 600)}`}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: `${sw?.color}22`,
                  border: `1px solid ${sw?.color}44`,
                  color: sw?.color,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.65rem',
                }}
              >
                {sw?.abbr}
              </span>
              <span>{sw?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Marquee */}
      <div
        className="py-8 overflow-hidden"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems]?.map((item, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#50e5ea' }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
