'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => {
      if (textRef?.current) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translateY(0)';
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    const el = document.querySelector('#contact');
    if (el) el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowreel = () => {
    const el = document.querySelector('#portfolio');
    if (el) el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(80,229,234,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: 'linear-gradient(to top, #0d0d0d, transparent)',
        }}
      />
      {/* Glow rings */}
      <div
        className="absolute z-10"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(80,229,234,0.06)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'pulse-ring 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute z-10"
        style={{
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          border: '1px solid rgba(80,229,234,0.03)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'pulse-ring 4s ease-in-out infinite 1s',
        }}
      />
      {/* Main content */}
      <div
        ref={textRef}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        style={{
          opacity: 0,
          transform: 'translateY(40px)',
          transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Label */}
        <span className="section-label" style={{ animationDelay: '0.2s' }}>
          Digital Marketing Agency
        </span>

        {/* Headline */}
        <h1
          className="font-montserrat font-black text-white mb-6 leading-none tracking-tight"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            lineHeight: '1.0',
            fontWeight: 900,
          }}
        >
          Turn Ideas Into{' '}
          <span className="gradient-text">Impactful</span>
          <br />
          Digital Brands
        </h1>

        {/* Sub-headline */}
        <p
          className="text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 300,
          }}
        >
          A results-driven digital marketing agency focused on building strong digital
          presence and generating measurable growth
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGetStarted}
            className="btn-cyan"
            style={{ fontSize: '0.95rem', padding: '16px 40px' }}
          >
            Get Started
          </button>
          <button
            onClick={handleShowreel}
            className="btn-outline flex items-center gap-3"
            style={{ fontSize: '0.95rem', padding: '16px 40px' }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(80,229,234,0.15)', border: '1px solid rgba(80,229,234,0.3)' }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M1 1L9 6L1 11V1Z" fill="#50e5ea" />
              </svg>
            </span>
            View Our Work
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Scroll to explore
          </span>
          <div
            className="w-px h-12"
            style={{
              background: 'linear-gradient(to bottom, rgba(80,229,234,0.6), transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      {/* Floating particles */}
      {[...Array(12)]?.map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 4) * 20}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            animationDuration: `${4 + i * 0.7}s`,
            animationDelay: `${i * 0.4}s`,
            opacity: 0.3 + (i % 4) * 0.1,
          }}
        />
      ))}
    </section>
  );
}
