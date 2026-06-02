'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const images = [
    '/hero-salon.png',
    '/service-hair.png',
    '/service-skin.png',
    '/service-nails.png'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Variants for animations
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: custom * 0.15,
      },
    }),
  };

  return (
    <section className={styles.heroContainer}>
      <div className={styles.bgCircle} />
      
      <div className={styles.heroLeft}>
        <motion.p 
          className={styles.tagline}
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          ✦ Established 2019 · Akurdi, Pune
        </motion.p>
        
        <motion.h1 
          className={styles.title}
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
        >
          Where Beauty<br />Meets <em>Artistry</em>
        </motion.h1>
        
        <motion.p 
          className={styles.desc}
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
        >
          A sanctuary of style in the heart of Akurdi, Pune. Experience expert hair, skin & nail services crafted with professional precision, for men and women.
        </motion.p>
        
        <motion.div 
          className={styles.ctas}
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
        >
          <button 
            onClick={() => scrollToSection('booking')} 
            className="btn-primary"
          >
            Book Appointment
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="btn-outline"
          >
            Our Services
          </button>
        </motion.div>
      </div>

      <div className={styles.heroRight}>
        {/* Floating Background Accent */}
        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <Image
                src={images[currentIndex]}
                alt={`Swati's Salon Slide ${currentIndex + 1}`}
                fill
                priority
                className={styles.heroImg}
                sizes="(max-width: 768px) 90vw, (max-width: 992px) 70vw, 45vw"
              />
            </motion.div>
          </AnimatePresence>

          <div className={styles.slideIndicators}>
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating Badges */}
        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className={styles.badgeNum}>500+</div>
          <div className={styles.badgeTxt}>Happy Clients</div>
        </motion.div>
      </div>
    </section>
  );
}
