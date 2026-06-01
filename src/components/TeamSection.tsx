'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './TeamSection.module.css';

interface Stylist { name: string; role: string; bio: string; image: string; }
interface TeamSectionProps { onSelectStylist: (name: string) => void; }

// ── 3D Magnetic card ──────────────────────────────────────────────────────────
function StylistCard({ stylist, index, onSelectStylist }: {
  stylist: Stylist;
  index: number;
  onSelectStylist: (n: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  // Entrance: fan-out from center — each card swings in from a different angle
  const angles = [-12, -4, 4, 12];
  const origins = ['120% 80%', '80% 120%', '20% 120%', '-20% 80%'];

  return (
    <motion.div
      ref={cardRef}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, rotate: angles[index % 4], scale: 0.85, y: 50 }}
      animate={inView
        ? { opacity: 1, rotate: 0, scale: 1, y: 0 }
        : { opacity: 0, rotate: angles[index % 4], scale: 0.85, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={styles.card}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Dynamic light glare */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: 'radial-gradient(circle at var(--gx) var(--gy), rgba(212,175,55,0.14) 0%, transparent 65%)',
            pointerEvents: 'none',
            zIndex: 4,
            '--gx': glowX,
            '--gy': glowY,
          } as React.CSSProperties}
        />

        {/* Avatar with orbit ring */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
          <motion.div
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              border: '1.5px solid',
              borderColor: 'var(--bronze)',
              opacity: 0.4,
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              inset: -14,
              borderRadius: '50%',
              border: '1px dashed',
              borderColor: 'var(--gold)',
              opacity: 0.2,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <div className={styles.imageContainer}>
            <Image
              src={stylist.image}
              alt={stylist.name}
              fill
              sizes="160px"
              className={styles.stylistImg}
              style={{ filter: index % 2 === 1 ? 'sepia(15%) contrast(95%) brightness(95%)' : 'none' }}
            />
          </div>
        </div>

        {/* Number badge */}
        <motion.div
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(176,125,74,0.15)',
            border: '1px solid rgba(176,125,74,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.65rem',
            color: 'var(--bronze)',
            fontWeight: 600,
          }}
          initial={{ scale: 0, rotate: -90 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 400, delay: index * 0.12 + 0.4 }}
        >
          0{index + 1}
        </motion.div>

        <h3 className={styles.stylistName}>{stylist.name}</h3>
        <span className={styles.stylistRole}>{stylist.role}</span>
        <p className={styles.stylistBio}>{stylist.bio}</p>

        <motion.button
          onClick={() => onSelectStylist(stylist.name)}
          className={styles.bookBtn}
          whileHover={{ scale: 1.05, backgroundColor: 'var(--bronze)', color: 'var(--white)' }}
          whileTap={{ scale: 0.95 }}
        >
          Book Consultation
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function TeamSection({ onSelectStylist }: TeamSectionProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const stylists: Stylist[] = [
    { name: 'Priya Sharma', role: 'Senior Stylist', bio: 'Over 8 years of styling in premium salons. Expert in precision haircuts and couture editorial styling.', image: '/team-stylist.png' },
    { name: 'Anita Desai', role: 'Colour Specialist', bio: 'Master of balayage, creative pigments, and high-fidelity global locks. Certified organic color expert.', image: '/team-stylist.png' },
    { name: 'Rekha Nair', role: 'Skin & Nail Expert', bio: 'Specialist in custom organic skin wellness treatments, hydra-glow facials, and couture nail art designs.', image: '/team-stylist.png' },
    { name: 'Sneha Kulkarni', role: 'Bridal Artist', bio: 'Curating stunning, personalized bridal makeovers and luxury wedding events across central India.', image: '/team-stylist.png' },
  ];

  return (
    <section className={styles.teamContainer} id="team">
      {/* ── Header with split-reveal ── */}
      <div className="section-header" style={{ marginBottom: '4rem' }} ref={headerRef}>
        <motion.p
          className="section-tag"
          style={{ color: 'var(--bronze)' }}
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={headerInView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
          transition={{ duration: 0.8 }}
        >
          Meet the Experts
        </motion.p>
        <motion.h2
          className="section-title"
          style={{ color: 'var(--white)', overflow: 'hidden' }}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={headerInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Our Master Stylists
        </motion.h2>
      </div>

      <div className={styles.teamGrid}>
        {stylists.map((stylist, index) => (
          <StylistCard
            key={index}
            stylist={stylist}
            index={index}
            onSelectStylist={onSelectStylist}
          />
        ))}
      </div>
    </section>
  );
}
