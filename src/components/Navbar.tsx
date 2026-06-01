'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SalonEquipmentLogo from './SalonEquipmentLogo';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState<{ id: number; emoji: string; x: number; y: number; rotate: number }[]>([]);
  const [logoActive, setLogoActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerMagic = (e: React.MouseEvent) => {
    setLogoActive(true);
    setTimeout(() => setLogoActive(false), 500);

    const emojis = ['✂️', '💈', '💇', '💅', '🪄', '🤡', '✨', '💆', '🧴'];
    const rect = e.currentTarget.getBoundingClientRect();
    const spawnX = rect.left + rect.width / 2;
    const spawnY = rect.top + rect.height / 2 + window.scrollY;

    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: spawnX,
      y: spawnY,
      rotate: Math.random() * 360,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.filter((p) => Date.now() - p.id < 2000));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Magic Particle Shower Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 99999, overflow: 'hidden' }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 1, 
              scale: 0.5, 
              x: p.x - 20, 
              y: p.y - 20,
              rotate: p.rotate
            }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: p.y + 400 + Math.random() * 200, 
              x: p.x + (Math.random() - 0.5) * 300,
              rotate: p.rotate + 360 * (Math.random() > 0.5 ? 1 : -1)
            }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{ 
              position: 'absolute', 
              fontSize: '2rem', 
              userSelect: 'none',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))'
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      <nav className={`${styles.navContainer} ${isScrolled ? styles.scrolled : ''}`}>
        <motion.div 
          onClick={triggerMagic}
          className={styles.logo}
          animate={logoActive ? {
            rotate: [0, -6, 6, -6, 6, 0],
            scale: [1, 1.1, 1.1, 1],
            transition: { duration: 0.5 }
          } : {}}
          whileHover={{ scale: 1.05 }}
          style={{ userSelect: 'none' }}
        >
          <SalonEquipmentLogo />
          <motion.span 
            animate={logoActive ? { rotate: 360, scale: [1, 1.5, 1] } : {}} 
            style={{ display: 'inline-block', marginLeft: '0.4rem', color: 'var(--gold)' }}
          >
            🪄
          </motion.span>
        </motion.div>

        <ul className={styles.navLinks}>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
          <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a></li>
          <li><a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>Team</a></li>
          <li><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>Reviews</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Location</a></li>
        </ul>

        <div className={styles.navRight}>
          <button 
            className={styles.navBtn} 
            onClick={() => scrollToSection('booking')}
          >
            Book Now
          </button>
          <button 
            className={styles.menuBtn} 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className={styles.backdrop}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={styles.mobileMenu}
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <ul className={styles.mobileMenuLinks}>
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>
                    Team
                  </a>
                </li>
                <li>
                  <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                    Location
                  </a>
                </li>
              </ul>

              <button 
                className="btn-primary" 
                style={{ width: '100%', marginTop: 'auto' }}
                onClick={() => scrollToSection('booking')}
              >
                Book Now
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
