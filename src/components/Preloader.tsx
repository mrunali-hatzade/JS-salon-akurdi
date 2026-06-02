'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the window to load or force a minimum timeout for aesthetics
    const handleLoad = () => {
      // Add a slight delay so the elegant animation completes
      setTimeout(() => setIsLoading(false), 1200);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timeout just in case load event fails
      const fallback = setTimeout(handleLoad, 2500);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.preloaderContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={styles.logoText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className={styles.js}>SWATI&apos;S</span>
            <span className={styles.salon}>SALON</span>
          </motion.div>
          
          <div className={styles.loaderLine}>
            <motion.div 
              className={styles.loaderLineInner}
              animate={{ 
                x: ['-100%', '300%']
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
