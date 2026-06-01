'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Scissors, Brush, Sparkles } from 'lucide-react';
import styles from './Floating3DShapes.module.css';

export default function Floating3DShapes() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Create a spring-smoothed version of the scroll for buttery parallax
  const smoothScroll = useSpring(scrollY, { damping: 30, stiffness: 100, mass: 1 });

  // Only show the shapes AFTER the user scrolls past the hero section (approx 800px)
  const opacity = useTransform(smoothScroll, [600, 900], [0, 1]);

  // Parallax transform values for different shapes
  const y1 = useTransform(smoothScroll, [0, 4000], [0, -500]);
  const y2 = useTransform(smoothScroll, [0, 4000], [0, -300]);
  const y3 = useTransform(smoothScroll, [0, 4000], [0, -700]);
  const y4 = useTransform(smoothScroll, [0, 4000], [0, -400]);
  
  const rotate1 = useTransform(smoothScroll, [0, 4000], [0, 180]);
  const rotate2 = useTransform(smoothScroll, [0, 4000], [0, -180]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      className={styles.floatingShapesContainer}
      style={{ opacity }}
    >
      {/* Large Glass Sphere - Top Right */}
      <motion.div 
        className={`${styles.shape} ${styles.sphere}`}
        style={{ 
          top: '15%', 
          right: '5%',
          y: y1,
          rotate: rotate1
        }}
      />

      {/* Floating Salon Scissors */}
      <motion.div 
        className={styles.equipment}
        style={{ 
          top: '25%', 
          right: '25%',
          y: y4,
          rotate: rotate2,
          width: '120px',
          height: '120px'
        }}
      >
        <Scissors strokeWidth={1} />
      </motion.div>
      
      {/* Small Diamond - Mid Left */}
      <motion.div 
        className={`${styles.shape} ${styles.diamond}`}
        style={{ 
          top: '45%', 
          left: '10%',
          y: y2,
          rotate: rotate2,
          rotateX: rotate1
        }}
      />

      {/* Floating Salon Brush */}
      <motion.div 
        className={styles.equipment}
        style={{ 
          top: '55%', 
          left: '20%',
          y: y3,
          rotate: rotate1,
          width: '100px',
          height: '100px',
          animationDelay: '1s'
        }}
      >
        <Brush strokeWidth={1} />
      </motion.div>

      {/* 3D Ring - Bottom Right */}
      <motion.div 
        className={`${styles.shape} ${styles.ring}`}
        style={{ 
          bottom: '10%', 
          right: '15%',
          y: y3,
          rotateZ: rotate1
        }}
      />
      
      {/* Another Sphere - Bottom Left */}
      <motion.div 
        className={`${styles.shape} ${styles.sphere}`}
        style={{ 
          bottom: '-10%', 
          left: '-5%',
          width: '450px',
          height: '450px',
          y: y1,
        }}
      />

      {/* Floating Sparkles - Center Bottom */}
      <motion.div 
        className={styles.equipment}
        style={{ 
          bottom: '15%', 
          left: '45%',
          y: y2,
          rotate: rotate2,
          width: '80px',
          height: '80px',
          animationDelay: '2s'
        }}
      >
        <Sparkles strokeWidth={1} />
      </motion.div>
    </motion.div>
  );
}
