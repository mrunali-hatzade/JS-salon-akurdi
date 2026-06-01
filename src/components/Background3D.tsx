'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Background3D.module.css';

export default function Background3D() {
  const [mounted, setMounted] = useState(false);

  // Motion values for mouse position parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for lag-free, elastic movements
  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize position between -0.5 and 0.5 relative to window center
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return <div className={styles.bgContainer} />;

  // Transform multipliers to shift different orbs at slightly different rates (creates depth/3D parallax)
  return (
    <div className={styles.bgContainer}>
      {/* 3D structural grid overlay */}
      <div className={styles.gridOverlay} />

      {/* Floating Orb 1: Shifting top-right (Parallax + Slow organic rotation) */}
      <motion.div
        className={`${styles.orb} ${styles.orb1}`}
        style={{
          x: smoothX.get() * -40,
          y: smoothY.get() * -40,
        }}
        animate={{
          scale: [1, 1.05, 0.95, 1],
          y: [0, 15, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Orb 2: Shifting bottom-left (Parallax + Slow organic rotation) */}
      <motion.div
        className={`${styles.orb} ${styles.orb2}`}
        style={{
          x: smoothX.get() * 50,
          y: smoothY.get() * 50,
        }}
        animate={{
          scale: [1, 0.95, 1.08, 1],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating Orb 3: Mid-ground (Parallax + Slow organic rotation) */}
      <motion.div
        className={`${styles.orb} ${styles.orb3}`}
        style={{
          x: smoothX.get() * -25,
          y: smoothY.get() * 25,
        }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
          x: [0, 25, -25, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}
