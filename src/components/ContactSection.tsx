'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, MessageSquare } from 'lucide-react';
import styles from './ContactSection.module.css';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: '-60px' });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Staggered info row animation variants
  const infoVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const rowVariant = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <>
      <section className={styles.contactContainer} id="contact" ref={sectionRef}>
        <div className={styles.contactInner}>
          <motion.div
            className={styles.contactInfo}
            variants={infoVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={rowVariant}
            >Find Us in Pune</motion.h2>
            
            <div className={styles.infoCard}>
              <motion.div className={styles.infoRow} variants={rowVariant}>
                <MapPin className={styles.infoIcon} size={24} />
                <div>
                  <div className={styles.infoLabel}>Address</div>
                  <div className={styles.infoVal}>
                    20/4, Lig Colony Road, Sindhu Nagar,<br />
                    Sector 25, Pradhikaran, Akurdi, Pune
                  </div>
                </div>
              </motion.div>

              <motion.div className={styles.infoRow} variants={rowVariant}>
                <Clock className={styles.infoIcon} size={24} />
                <div>
                  <div className={styles.infoLabel}>Hours</div>
                  <div className={styles.infoVal}>
                    Mon–Sat: 10 AM – 8 PM<br />
                    Sunday: 10 AM – 8 PM
                  </div>
                </div>
              </motion.div>

              <motion.div className={styles.infoRow} variants={rowVariant}>
                <Phone className={styles.infoIcon} size={24} />
                <div>
                  <div className={styles.infoLabel}>Phone</div>
                  <div className={styles.infoVal}>+91 72769 59293</div>
                </div>
              </motion.div>

              <motion.div className={styles.infoRow} variants={rowVariant}>
                <MessageSquare className={styles.infoIcon} size={24} />
                <div>
                  <div className={styles.infoLabel}>WhatsApp</div>
                  <div className={styles.infoVal}>+91 72769 59293</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className={styles.mapContainer}
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15125.797241772658!2d73.7574165!3d18.6444583!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9f1b0f12cab%3A0x2f4f269c55c18f57!2sSWATI&#39;S%20BEAUTY%20SALON%20SPA%20AND%20ACADEMY!5e0!3m2!1sen!2sin!4v1717319985956!5m2!1sen!2sin"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Swati's Beauty Salon Akurdi Location Map"
            />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div>
            <div className={styles.footerLogo}>
              Swati&apos;s <span>Salon</span>
            </div>
            <p className={styles.footerTagline}>
              Pune's premier unisex beauty salon, spa and academy in Pradhikaran, Akurdi — expert haircuts, colour, skin & nail treatments for everyone.
            </p>
          </div>

          <div className={styles.footerNav}>
            <div className={styles.footerCol}>
              <h4>Navigation</h4>
              <ul>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
                <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a></li>
                <li><a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>Team</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Location</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4>Services</h4>
              <ul>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Hair Care</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Nail Studio</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Skin Glow</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Bridal Glam</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div>© {new Date().getFullYear()} Swati&apos;s Beauty Salon, Pune. All rights reserved.</div>
          
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <FacebookIcon size={20} />
            </a>
            <a href="https://wa.me/917276959293" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
              <MessageSquare size={20} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
