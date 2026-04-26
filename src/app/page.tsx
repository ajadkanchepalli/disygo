'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

const ThreeBackground = dynamic(() => import('@/components/ui/ThreeBackground'), {
  ssr: false,
});

export default function HomePage() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cursor glow effect
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Global scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealEls = entry.target.querySelectorAll(
              '.reveal, .reveal-left, .reveal-right, .reveal-scale'
            );
            revealEls.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <main
      className="relative"
      style={{ background: '#0d0d0d', minHeight: '100vh', overflowX: 'hidden' }}
    >
      {/* Three.js 3D Background */}
      <ThreeBackground />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" />

      {/* Content layers above Three.js canvas */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
