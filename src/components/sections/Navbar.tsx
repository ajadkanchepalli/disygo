'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sections = ['home', 'services', 'portfolio', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { label: 'About', href: '#about', id: 'about' },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center group"
          >
            <Image
              src="/assets/images/Disygo-1777187579051.png"
              alt="Disygo Digital Solutions Logo"
              width={130}
              height={52}
              className="object-contain transition-all duration-300 group-hover:brightness-110"
              priority
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-md group ${
                  activeSection === link.id
                    ? 'text-[#50e5ea]'
                    : 'text-white/60 hover:text-white'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {link.label}
                {/* Active / hover underline */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#50e5ea] rounded-full transition-all duration-300 ${
                    activeSection === link.id ? 'w-4' : 'w-0 group-hover:w-4'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Divider */}
            <div className="w-px h-5 bg-white/10" />
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide text-[#0d0d0d] bg-[#50e5ea] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(80,229,234,0.55)] hover:-translate-y-0.5 active:translate-y-0"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <span className="relative z-10">Let&apos;s Talk</span>
              {/* Arrow icon */}
              <svg
                className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 14 14"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 7h12M8 2l5 5-5 5" />
              </svg>
              {/* Shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative z-[110] flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? 'w-0 opacity-0' : 'w-5'
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0d0d0d]/95 backdrop-blur-2xl"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`relative z-10 flex flex-col h-full px-8 pt-28 pb-12 transition-all duration-500 ${
            mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          {/* Nav Links */}
          <div className="flex flex-col gap-2 flex-1">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`flex items-center justify-between py-4 border-b border-white/[0.07] text-2xl font-bold tracking-tight transition-all duration-300 ${
                  activeSection === link.id ? 'text-[#50e5ea]' : 'text-white/80 hover:text-white'
                }`}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                }}
              >
                <span>{link.label}</span>
                <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            ))}
          </div>

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="mt-8 flex items-center justify-center gap-2 py-4 text-base font-bold tracking-wide text-[#0d0d0d] bg-[#50e5ea] rounded-2xl hover:shadow-[0_0_30px_rgba(80,229,234,0.5)] transition-all duration-300"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Let&apos;s Talk
            <svg className="w-4 h-4" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </a>

          {/* Bottom tagline */}
          <p className="mt-6 text-center text-xs text-white/20 tracking-widest uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Disygo Digital Solutions
          </p>
        </div>
      </div>
    </>
  );
}
