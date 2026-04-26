'use client';

import { useEffect, useRef, useState } from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  bgColor: string;
  size: 'large' | 'medium' | 'small';
  icon: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Tirupati's Most Beautiful Cafe",
    category: 'Social Media',
    description: 'Complete brand identity & social media campaign for a premium rooftop cafe',
    bgColor: 'linear-gradient(135deg, #1a0a00 0%, #3d1a00 100%)',
    size: 'large',
    icon: '☕',
  },
  {
    id: 2,
    title: 'Motivation Books',
    category: 'Content Production',
    description: 'Visual storytelling campaign for a motivational book brand',
    bgColor: 'linear-gradient(135deg, #0a1a0a 0%, #0d3d0d 100%)',
    size: 'medium',
    icon: '📚',
  },
  {
    id: 3,
    title: 'Motion Graphics Showreel',
    category: 'Motion Graphics',
    description: 'Dynamic cityscape motion graphics with DISYGO brand identity',
    bgColor: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d3d 100%)',
    size: 'medium',
    icon: '🎬',
  },
  {
    id: 4,
    title: 'Nail Craft Studio',
    category: 'Social Media',
    description: 'Elegant brand visuals and social media content for a nail art studio',
    bgColor: 'linear-gradient(135deg, #1a0a1a 0%, #3d0d3d 100%)',
    size: 'small',
    icon: '💅',
  },
  {
    id: 5,
    title: 'LoveOn Click',
    category: 'Content Production',
    description: 'Wedding photography & videography brand content production',
    bgColor: 'linear-gradient(135deg, #1a0a0a 0%, #3d0d0d 100%)',
    size: 'small',
    icon: '💍',
  },
  {
    id: 6,
    title: 'Wedding Invitations',
    category: 'Design',
    description: 'Luxury digital wedding invitation designs with custom animations',
    bgColor: 'linear-gradient(135deg, #0a1a1a 0%, #0d3d3d 100%)',
    size: 'medium',
    icon: '💌',
  },
  {
    id: 7,
    title: 'Real Estate Layouts',
    category: 'Design',
    description: 'Professional land layout maps and property marketing materials',
    bgColor: 'linear-gradient(135deg, #1a1a0a 0%, #3d3d0d 100%)',
    size: 'small',
    icon: '🏗️',
  },
  {
    id: 8,
    title: 'Brand Video Production',
    category: 'Content Production',
    description: 'High-quality brand storytelling videos for digital platforms',
    bgColor: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2a 100%)',
    size: 'large',
    icon: '🎥',
  },
];

const categories = ['All', 'Social Media', 'Content Production', 'Motion Graphics', 'Design'];

const portfolioStats = [
  { value: '900+', label: 'Posters Created' },
  { value: '500+', label: 'Reels Produced' },
  { value: '100+', label: 'Motion Graphics' },
  { value: '50+', label: 'Brands Served' },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(80,229,234,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 reveal">
          <span className="section-label">Real Works</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-montserrat font-bold text-white"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Explore Our{' '}
              <span className="gradient-text">Real Works</span>
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
              From brand campaigns to motion graphics — every project tells a unique story.
            </p>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 reveal delay-100">
          {portfolioStats.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4 rounded-2xl"
              style={{
                background: 'rgba(80,229,234,0.04)',
                border: '1px solid rgba(80,229,234,0.1)',
              }}
            >
              <div
                className="font-montserrat font-black gradient-text mb-1"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 900,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 reveal delay-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className={`portfolio-card reveal-scale delay-${Math.min((i + 1) * 100, 600)} break-inside-avoid mb-4`}
              style={{
                height:
                  item.size === 'large' ? '380px' : item.size === 'medium' ? '280px' : '220px',
              }}
            >
              {/* Gradient background */}
              <div
                className="w-full h-full flex flex-col items-center justify-center p-6"
                style={{ background: item.bgColor }}
              >
                {/* Icon */}
                <div
                  className="mb-4 flex items-center justify-center"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'rgba(80,229,234,0.1)',
                    border: '1px solid rgba(80,229,234,0.2)',
                    fontSize: '1.8rem',
                  }}
                >
                  {item.icon}
                </div>

                {/* Category badge */}
                <span
                  className="px-3 py-1 rounded-full text-xs mb-3"
                  style={{
                    background: 'rgba(80,229,234,0.1)',
                    border: '1px solid rgba(80,229,234,0.2)',
                    color: '#50e5ea',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.category}
                </span>

                <h3
                  className="text-center font-montserrat font-bold text-white mb-2"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: item.size === 'large' ? '1.2rem' : '1rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-center"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.5,
                    display: item.size === 'small' ? 'none' : 'block',
                  }}
                >
                  {item.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="overlay">
                <div>
                  <span
                    className="block font-montserrat font-bold text-white mb-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', fontWeight: 700 }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      color: '#50e5ea',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 reveal">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline inline-block"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
