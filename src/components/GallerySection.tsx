'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import styles from './GallerySection.module.css';

interface GalleryItem {
  id: number;
  title: string;
  category: 'hair' | 'skin' | 'nails' | 'bridal';
  categoryLabel: string;
  image: string;
  large?: boolean;
}

// ── Animated section tag with draw-on underline ──────────────────────────────
function AnimatedSectionTag({ children }: { children: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="section-tag" style={{ display: 'inline-block', position: 'relative' }}>
      {children}
      <motion.span
        style={{
          position: 'absolute',
          bottom: '-4px',
          left: 0,
          height: '1px',
          background: 'var(--bronze)',
          originX: 0,
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className=""
        aria-hidden
      />
    </span>
  );
}

// ── Masonry item with staggered reveal + parallax depth ───────────────────────
function GalleryCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  // Alternate direction: odd from left, even from right, some from bottom
  const getInitial = (i: number) => {
    if (i % 3 === 0) return { opacity: 0, y: 60, scale: 0.92 };
    if (i % 3 === 1) return { opacity: 0, x: -50, rotate: -3 };
    return { opacity: 0, x: 50, rotate: 3 };
  };

  return (
    <motion.div
      ref={ref}
      layout
      key={item.id}
      initial={getInitial(index)}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 } : getInitial(index)}
      exit={{ opacity: 0, scale: 0.88, y: 20 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`${styles.item} ${item.large ? styles.itemLarge : ''}`}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03, zIndex: 2 }}
      style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
    >
      {/* Image with zoom on hover */}
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        animate={hovered ? { scale: 1.08 } : { scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
          className={styles.galleryImg}
        />
      </motion.div>

      {/* Shimmer sweep on hover */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.18) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        initial={{ backgroundPosition: '-100% 0' }}
        animate={hovered ? { backgroundPosition: ['−100% 0', '200% 0'] } : { backgroundPosition: '-100% 0' }}
        transition={{ duration: 0.7 }}
      />

      <div className={styles.overlay}>
        {/* Zoom icon with spin-in */}
        <motion.div
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--white)' }}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={hovered ? { rotate: 0, opacity: 1, scale: 1 } : { rotate: -90, opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ZoomIn size={20} />
        </motion.div>

        {/* Text reveal from bottom */}
        <motion.span
          className={styles.itemCategory}
          initial={{ y: 12, opacity: 0 }}
          animate={hovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {item.categoryLabel}
        </motion.span>
        <motion.h4
          className={styles.itemTitle}
          initial={{ y: 16, opacity: 0 }}
          animate={hovered ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {item.title}
        </motion.h4>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [filter, setFilter] = useState<'all' | 'hair' | 'skin' | 'nails' | 'bridal'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const categories = [
    { value: 'all', label: 'All Work' },
    { value: 'hair', label: 'Hair' },
    { value: 'skin', label: 'Skin Glow' },
    { value: 'nails', label: 'Nails' },
    { value: 'bridal', label: 'Bridal' },
  ] as const;

  const galleryItems: GalleryItem[] = [
    { id: 1, title: 'Balayage Transformation', category: 'hair', categoryLabel: 'Hair Transformation', image: '/service-hair.png', large: true },
    { id: 2, title: 'Luxury Editorial Styling', category: 'bridal', categoryLabel: 'Bridal Styling', image: '/hero-salon.png' },
    { id: 3, title: 'Gold Leaf Nail Detailing', category: 'nails', categoryLabel: 'Nail Art', image: '/service-nails.png' },
    { id: 4, title: 'Organic Hydra-Facial Glow', category: 'skin', categoryLabel: 'Skin Glow', image: '/service-skin.png', large: true },
    { id: 5, title: 'Elegant Bridal Makeover', category: 'bridal', categoryLabel: 'Bridal Styling', image: '/hero-salon.png' },
    { id: 6, title: 'Copper Red Highlights', category: 'hair', categoryLabel: 'Hair Colour', image: '/service-hair.png' },
  ];

  const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <section className={styles.galleryContainer} id="gallery">
      {/* ── Header with fade-up stagger ── */}
      <div className="section-header" ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <AnimatedSectionTag>Our Lookbook</AnimatedSectionTag>
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Gallery
        </motion.h2>
      </div>

      {/* ── Filter Pills with spring pop-in ── */}
      <div className={styles.filters}>
        {categories.map((cat, i) => (
          <motion.button
            key={cat.value}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: i * 0.07 }}
            className={`${styles.filterBtn} ${filter === cat.value ? styles.activeFilterBtn : ''}`}
            onClick={() => setFilter(cat.value)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            layout
          >
            {cat.label}
            {filter === cat.value && (
              <motion.div
                layoutId="filterIndicator"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  background: 'var(--bronze)',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* ── Gallery Grid ── */}
      <motion.div layout className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Lightbox with cinematic entrance ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.lightbox}
            onClick={() => setSelectedItem(null)}
          >
            <motion.button
              className={styles.closeBtn}
              onClick={() => setSelectedItem(null)}
              aria-label="Close view"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className={styles.lightboxContent}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className={styles.lightboxImg}
                />
              </div>
              <motion.div
                className={styles.lightboxDetails}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <p className={styles.lightboxCategory}>{selectedItem.categoryLabel}</p>
                <h3 className={styles.lightboxTitle}>{selectedItem.title}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
