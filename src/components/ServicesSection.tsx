'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { ArrowRight, Scissors, Sparkles, Paintbrush, Heart, ShowerHead } from 'lucide-react';
import styles from './ServicesSection.module.css';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

interface Service {
  name: string;
  icon: React.ReactNode;
  desc: string;
  price: string;
  image: string;
}

/* ─────────────────────────────────────────────
   Split-text letter animation variants
───────────────────────────────────────────── */
const letterContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 24, rotateX: -40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/* ─────────────────────────────────────────────
   Grid stagger variants (per-card defined inline)
───────────────────────────────────────────── */
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

/* ─────────────────────────────────────────────
   TiltCard – isolated so each card owns its own
   motion values and doesn't bleed state.
───────────────────────────────────────────── */
interface TiltCardProps {
  service: Service;
  index: number;
  onSelectService: (name: string) => void;
}

function TiltCard({ service, index, onSelectService }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Motion values for 3-D tilt & lift ── */
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale   = useMotionValue(1);
  const rawY       = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 25, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 25, mass: 0.5 });
  const scale   = useSpring(rawScale,   { stiffness: 260, damping: 20 });
  const y       = useSpring(rawY,       { stiffness: 200, damping: 20 });

  /* ── Motion values for magnetic shimmer position ── */
  const shimmerX = useMotionValue(-120);
  const shimmerOpacity = useMotionValue(0);
  const shimmerOpacitySpring = useSpring(shimmerOpacity, { stiffness: 200, damping: 25 });

  /* ── Slide-in direction: even → from left, odd → from right ── */
  const slideX = index % 2 === 0 ? -80 : 80;

  const cardVariant = {
    hidden: { opacity: 0, x: slideX, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  /* ── Mouse handlers ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;

      // Tilt: max ±12 deg
      rawRotateY.set(( dx / (rect.width  / 2)) * 12);
      rawRotateX.set((-dy / (rect.height / 2)) * 12);

      // Shimmer position relative to card
      shimmerX.set(e.clientX - rect.left);
    },
    [rawRotateX, rawRotateY, shimmerX],
  );

  const handleMouseEnter = useCallback(() => {
    rawScale.set(1.035);
    rawY.set(-8);
    shimmerOpacity.set(1);
  }, [rawScale, rawY, shimmerOpacity]);

  const handleMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
    rawY.set(0);
    shimmerOpacity.set(0);
  }, [rawRotateX, rawRotateY, rawScale, rawY, shimmerOpacity]);

  /* ── Shimmer gradient X → percentage ── */
  const shimmerLeft = useTransform(shimmerX, (v) => `${v}px`);

  return (
    <motion.div
      variants={cardVariant}
      style={{
        perspective: 900,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        ref={cardRef}
        className={styles.card}
        style={{
          rotateX,
          rotateY,
          scale,
          y,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
      >
        {/* ── Golden shimmer sweep layer ── */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: shimmerLeft,
            translateX: '-50%',
            width: 220,
            height: '100%',
            background:
              'linear-gradient(105deg, transparent 20%, rgba(176,125,74,0.18) 50%, transparent 80%)',
            pointerEvents: 'none',
            zIndex: 5,
            opacity: shimmerOpacitySpring,
          }}
        />

        {/* ── Background hover image ── */}
        <div className={styles.bgImage}>
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            className={styles.bgImg}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.bgImageOverlay} />
        </div>

        {/* ── Card content ── */}
        <div className={styles.cardContent}>

          {/* Icon – spring bounce + rotate on hover */}
          <motion.div
            className={styles.iconWrapper}
            variants={{
              hover: {
                scale: 1.18,
                rotate: [0, -8, 8, -4, 4, 0],
                color: 'var(--gold)',
                transition: {
                  duration: 0.5,
                  ease: 'easeInOut'
                }
              }
            }}
            style={{ display: 'inline-block', cursor: 'default' }}
          >
            {service.icon}
          </motion.div>

          <h3 className={styles.serviceName}>{service.name}</h3>
          <p  className={styles.serviceDesc}>{service.desc}</p>

          <div className={styles.cardFooter}>
            <span className={styles.price}>{service.price}</span>
            <motion.span
              onClick={() => onSelectService(service.name)}
              className={styles.bookLink}
              whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400 } }}
              style={{ cursor: 'pointer' }}
            >
              Book Now <ArrowRight size={14} />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Split-text title component
───────────────────────────────────────────── */
function SplitTextTitle({ text }: { text: string }) {
  return (
    <motion.h2
      className="section-title"
      variants={letterContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        perspective: 600,
        overflow: 'visible',
      }}
      aria-label={text}
    >
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} style={{ display: 'inline-block', width: '0.35em' }} aria-hidden />
        ) : (
          <motion.span
            key={i}
            variants={letterVariants}
            aria-hidden
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity, filter',
            }}
          >
            {char}
          </motion.span>
        ),
      )}
    </motion.h2>
  );
}

/* ─────────────────────────────────────────────
   Main section component
───────────────────────────────────────────── */
export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const services: Service[] = [
    {
      name: 'Hair Styling',
      icon: <Scissors size={32} />,
      desc: 'Precision cuts, blowouts & bespoke styling crafted by our master stylists to suit your features.',
      price: 'From ₹300',
      image: '/service-hair.png',
    },
    {
      name: 'Hair Colour',
      icon: <Paintbrush size={32} />,
      desc: 'Balayage, sun-kissed highlights, global colors, and creative styling using high-end organic formulas.',
      price: 'From ₹800',
      image: '/service-hair.png',
    },
    {
      name: 'Facial & Skin',
      icon: <Sparkles size={32} />,
      desc: 'Rejuvenating facials, deep-hydration treatments, and brightening skin therapies for a natural glow.',
      price: 'From ₹600',
      image: '/service-skin.png',
    },
    {
      name: 'Nail Studio',
      icon: <Sparkles size={32} />,
      desc: 'Luxury manicures, organic pedicures, intricate nail art, and long-lasting gel extensions.',
      price: 'From ₹250',
      image: '/service-nails.png',
    },
    {
      name: 'Bridal Package',
      icon: <Heart size={32} />,
      desc: 'Complete curated bridal packages including HD hair design, couture makeup, and glowing skin preps.',
      price: 'From ₹5,000',
      image: '/hero-salon.png',
    },
    {
      name: 'Hair Spa',
      icon: <ShowerHead size={32} />,
      desc: 'Restorative hair therapies, deep conditioning, keratin treats, and scalp massages for healthy hair.',
      price: 'From ₹700',
      image: '/service-hair.png',
    },
  ];

  /* Section header tag slide-up */
  const tagVariants = {
    hidden:  { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className={styles.servicesContainer} id="services">
      {/* ── Section header ── */}
      <div className="section-header">
        <motion.p
          className="section-tag"
          variants={tagVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          What We Offer
        </motion.p>

        {/* Character-by-character split text reveal */}
        <SplitTextTitle text="Our Services" />
      </div>

      {/* ── Cards grid ── */}
      <motion.div
        className={styles.servicesGrid}
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {services.map((service, index) => (
          <TiltCard
            key={service.name}
            service={service}
            index={index}
            onSelectService={onSelectService}
          />
        ))}
      </motion.div>
    </section>
  );
}
