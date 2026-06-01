'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// --- J (Hair Dryer) ---
const DrierJ = () => {
  const [isBlowing, setIsBlowing] = useState(false);
  return (
    <motion.span
      onMouseEnter={() => setIsBlowing(true)}
      onMouseLeave={() => setIsBlowing(false)}
      style={{ display: 'inline-flex', position: 'relative', width: '22px', height: '28px', verticalAlign: 'middle', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
    >
      <svg width="22" height="28" viewBox="0 0 24 30" fill="none" stroke="currentColor" strokeWidth="2.8">
        {/* dryer body */}
        <motion.g
          animate={isBlowing ? { rotate: [-6, 6, -6, 0] } : {}}
          transition={{ duration: 0.5 }}
          style={{ originX: '12px', originY: '15px' }}
        >
          <ellipse cx="11" cy="13" rx="7" ry="5" />
          <path d="M18 13h4" strokeLinecap="round" />
          <path d="M11 18v7" strokeLinecap="round" />
        </motion.g>
        {/* air puffs */}
        <motion.g
          animate={isBlowing ? { x: [0, 4, 0], opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 0.6, repeat: isBlowing ? Infinity : 0 }}
        >
          <path d="M22 10 Q25 10 24 8" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M22 13 Q26 13 25 11" strokeLinecap="round" strokeWidth="1.8" />
        </motion.g>
      </svg>
    </motion.span>
  );
};

// --- S (Hair Wave) for "JS" brand part ---
const WaveS = () => (
  <motion.svg
    width="18"
    height="26"
    viewBox="0 0 24 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    whileHover={{ scale: 1.1, skewX: [-6, 6, -6, 0] }}
    transition={{ duration: 0.5 }}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M18 4c-4-2-10 0-10 6s8 4 8 10-6 8-12 5" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
);

// --- S (Hair Wave) for SALON word ---
const WaveSalon = () => (
  <motion.svg
    width="18"
    height="26"
    viewBox="0 0 24 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    whileHover={{ scale: 1.1, skewX: [-6, 6, -6, 0] }}
    transition={{ duration: 0.5 }}
    style={{ display: 'inline-block', verticalAlign: 'middle', color: 'var(--bronze)' }}
  >
    <path d="M18 4c-4-2-10 0-10 6s8 4 8 10-6 8-12 5" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
);

// --- a (Comb) for SALON ---
const CombA = () => (
  <motion.svg
    width="14"
    height="26"
    viewBox="0 0 18 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    whileHover={{ rotate: [0, -10, 10, -5, 0] }}
    transition={{ duration: 0.5 }}
    style={{ originX: '5px', originY: '23px', display: 'inline-block', verticalAlign: 'middle', color: 'var(--bronze)' }}
  >
    <path d="M5 3v20" strokeLinecap="round" />
    <path d="M5 6h8M5 10h8M5 14h8M5 18h8" strokeLinecap="round" />
  </motion.svg>
);

// --- o (Nail Polish Bottle) ---
const PolishO = () => {
  const [isDripping, setIsDripping] = useState(false);
  return (
    <motion.span
      onMouseEnter={() => setIsDripping(true)}
      onMouseLeave={() => setIsDripping(false)}
      style={{ display: 'inline-flex', position: 'relative', width: '20px', height: '26px', verticalAlign: 'middle', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg width="20" height="26" viewBox="0 0 22 28" fill="none" stroke="currentColor" strokeWidth="2.8">
        <motion.g animate={isDripping ? { rotate: [0, -8, 8, -5, 0] } : {}} transition={{ duration: 0.5 }}>
          <rect x="3" y="11" width="16" height="13" rx="4" strokeLinecap="round" />
          <path d="M8 11V7h6v4" strokeLinecap="round" />
          <rect x="10" y="3" width="2" height="4" rx="0.5" />
        </motion.g>
        {/* Polish drop */}
        <motion.circle
          cx="11"
          cy="22"
          r="2"
          fill="var(--bronze)"
          stroke="none"
          animate={isDripping ? { y: [0, 6], opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </svg>
    </motion.span>
  );
};

export default function SalonEquipmentLogo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.1rem', fontWeight: 300 }}>
      {/* JS */}
      <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--dark)' }}>
        <DrierJ />
        <WaveS />
      </span>

      {/* spacer */}
      <span style={{ width: '0.45rem' }} />

      {/* SALON */}
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <WaveSalon />
        <span style={{ color: 'var(--bronze)', verticalAlign: 'middle' }}>a</span>
        <CombA />
        <PolishO />
        <span style={{ color: 'var(--bronze)', verticalAlign: 'middle' }}>n</span>
      </span>
    </span>
  );
}
