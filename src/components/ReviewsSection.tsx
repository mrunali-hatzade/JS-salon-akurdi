'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote, Send, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ReviewsSection.module.css';

const reviews = [
  {
    id: 1,
    name: 'Priya Mehta',
    service: 'Hair Colour',
    rating: 5,
    date: 'May 2025',
    avatar: 'P',
    color: '#B07D4A',
    review:
      "Absolutely loved my hair transformation! The team at Rajul Studio understood exactly what I wanted. The colour turned out stunning and the atmosphere is so calming. Will definitely be coming back!",
  },
  {
    id: 2,
    name: 'Rahul Deshmukh',
    service: 'Haircut & Styling',
    rating: 5,
    date: 'Apr 2025',
    avatar: 'R',
    color: '#6B4F3A',
    review:
      'Best haircut I have had in Pune. The stylist took time to understand my face shape and gave me the perfect look. Very professional and clean salon. Highly recommend!',
  },
  {
    id: 3,
    name: 'Sneha Joshi',
    service: 'Facial & Skin',
    rating: 5,
    date: 'Apr 2025',
    avatar: 'S',
    color: '#8E6239',
    review:
      'My skin is glowing after the facial! Very hygienic environment and the staff is so friendly and knowledgeable. The products they use are top quality. A true luxury experience.',
  },
  {
    id: 4,
    name: 'Amit Kulkarni',
    service: 'Hair Spa',
    rating: 4,
    date: 'Mar 2025',
    avatar: 'A',
    color: '#5C4033',
    review:
      'Great hair spa experience. My hair feels so soft and nourished. The salon is well located in Akurdi and the pricing is very reasonable for the quality of service provided.',
  },
  {
    id: 5,
    name: 'Nisha Patil',
    service: 'Nail Studio',
    rating: 5,
    date: 'Mar 2025',
    avatar: 'N',
    color: '#9C6B3C',
    review:
      'Got my nails done for a wedding and they looked absolutely gorgeous! The nail artist has incredible attention to detail. Everyone at the event was asking where I got them done.',
  },
  {
    id: 6,
    name: 'Kavita Sharma',
    service: 'Bridal Package',
    rating: 5,
    date: 'Feb 2025',
    avatar: 'K',
    color: '#7A5230',
    review:
      'Booked the bridal package and it was worth every rupee. I felt like a queen on my special day. The makeup and hair lasted all day and the team was so patient and caring.',
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= rating ? 'var(--gold)' : 'transparent'}
          stroke={star <= rating ? 'var(--gold)' : 'var(--sand)'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function InteractiveStars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '6px', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          <Star
            size={32}
            fill={star <= (hovered || value) ? 'var(--gold)' : 'transparent'}
            stroke={star <= (hovered || value) ? 'var(--gold)' : 'var(--sand)'}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  // Carousel state
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visibleReviews = reviews.slice(currentPage * perPage, currentPage * perPage + perPage);

  const goNext = () => setCurrentPage((p) => (p + 1) % totalPages);
  const goPrev = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    rating: 0,
    review: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    'Hair Styling', 'Hair Colour', 'Hair Spa',
    'Facial & Skin', 'Nail Studio', 'Bridal Package',
  ];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.service) e.service = 'Please select a service';
    if (!formData.rating) e.rating = 'Please give a rating';
    if (formData.review.trim().length < 20) e.review = 'Please write at least 20 characters';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  // Overall stats
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const fiveStars = reviews.filter((r) => r.rating === 5).length;
  const pctFive = Math.round((fiveStars / reviews.length) * 100);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const summaryRef = useRef(null);
  const summaryInView = useInView(summaryRef, { once: true, margin: '-60px' });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  return (
    <section className={styles.section} id="reviews">
      {/* ─── HEADER with curtain clip-path reveal ─── */}
      <div className="section-header" ref={headerRef}>
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.p>
        <motion.h2
          className="section-title"
          style={{ overflow: 'hidden' }}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={headerInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Reviews &amp; <em>Feedback</em>
        </motion.h2>
      </div>

      {/* ─── RATING SUMMARY BAR — float up ─── */}
      <motion.div
        className={styles.summaryBar}
        ref={summaryRef}
        initial={{ opacity: 0, y: 50 }}
        animate={summaryInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.summaryScore}>
          <span className={styles.bigScore}>{avgRating}</span>
          <StarRating rating={Math.round(Number(avgRating))} size={22} />
          <span className={styles.totalCount}>Based on {reviews.length} reviews</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryStats}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = Math.round((count / reviews.length) * 100);
            return (
              <div key={star} className={styles.statRow}>
                <span className={styles.statLabel}>{star} ★</span>
                <div className={styles.statBar}>
                  <motion.div
                    className={styles.statFill}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: (5 - star) * 0.1 }}
                  />
                </div>
                <span className={styles.statPct}>{pct}%</span>
              </div>
            );
          })}
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryBadge}>
          <div className={styles.badgeCircle}>
            <span className={styles.badgePct}>{pctFive}%</span>
            <span className={styles.badgeLabel}>5-star<br />reviews</span>
          </div>
          <p className={styles.badgeNote}>Rated 4.8 on Google</p>
        </div>
      </motion.div>

      {/* ─── REVIEW CARDS ─── */}
      <div className={styles.carouselWrap}>
        <button
          className={styles.navBtn}
          onClick={goPrev}
          aria-label="Previous reviews"
          id="reviews-prev"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.cardsGrid}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className={styles.cardsInner}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {visibleReviews.map((rev, i) => (
                <motion.div
                  key={rev.id}
                  className={styles.reviewCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {/* Quote icon */}
                  <Quote
                    size={28}
                    className={styles.quoteIcon}
                    fill="rgba(176,125,74,0.12)"
                    stroke="var(--bronze)"
                    strokeWidth={1}
                  />

                  <p className={styles.reviewText}>{rev.review}</p>

                  <div className={styles.reviewFooter}>
                    <div
                      className={styles.avatar}
                      style={{ background: rev.color }}
                    >
                      {rev.avatar}
                    </div>
                    <div className={styles.reviewMeta}>
                      <span className={styles.reviewerName}>{rev.name}</span>
                      <span className={styles.reviewerService}>{rev.service}</span>
                      <StarRating rating={rev.rating} size={13} />
                    </div>
                    <span className={styles.reviewDate}>{rev.date}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className={styles.navBtn}
          onClick={goNext}
          aria-label="Next reviews"
          id="reviews-next"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === currentPage ? styles.dotActive : ''}`}
            onClick={() => setCurrentPage(i)}
            aria-label={`Go to page ${i + 1}`}
            id={`reviews-dot-${i}`}
          />
        ))}
      </div>

      {/* ─── FEEDBACK FORM ─── */}
      <div className={styles.formSection} ref={formRef}>
        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 60 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className={styles.successState}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={styles.successIconWrap}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                >
                  <CheckCircle size={48} strokeWidth={1.5} />
                </motion.div>
                <h3 className={styles.successTitle}>Thank You!</h3>
                <p className={styles.successMsg}>
                  Your feedback means the world to us. We'll review it and post it shortly.
                </p>
                <button
                  className="btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', service: '', rating: 0, review: '' });
                    setErrors({});
                  }}
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className={styles.formEyebrow}>Share Your Experience</p>
                <h3 className={styles.formTitle}>Leave a <em>Review</em></h3>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  {/* Name + Phone */}
                  <div className={styles.row2}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="fb-name">Your Name *</label>
                      <input
                        id="fb-name"
                        type="text"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      />
                      {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="fb-phone">Phone (optional)</label>
                      <input
                        id="fb-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="fb-service">Service Received *</label>
                    <select
                      id="fb-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`${styles.input} ${styles.select} ${errors.service ? styles.inputError : ''}`}
                    >
                      <option value="">Select a service…</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <span className={styles.errorMsg}>{errors.service}</span>}
                  </div>

                  {/* Star Rating */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Your Rating *</label>
                    <InteractiveStars
                      value={formData.rating}
                      onChange={(v) => setFormData({ ...formData, rating: v })}
                    />
                    {errors.rating && <span className={styles.errorMsg}>{errors.rating}</span>}
                  </div>

                  {/* Review Text */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="fb-review">Your Review *</label>
                    <textarea
                      id="fb-review"
                      placeholder="Tell us about your experience at Rajul Studio…"
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      className={`${styles.textarea} ${errors.review ? styles.inputError : ''}`}
                    />
                    <div className={styles.charCount}>
                      {formData.review.length} / 500
                    </div>
                    {errors.review && <span className={styles.errorMsg}>{errors.review}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className={`btn-primary ${styles.submitBtn}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={15} />
                    Submit Feedback
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Side decorative info — stagger from right */}
        <div className={styles.formSide}>
          {[
            { icon: '★', title: '4.8 / 5', desc: 'Average rating on Google' },
            { icon: '💬', title: '500+', desc: 'Happy clients served' },
            { icon: '🏆', title: 'Best Salon', desc: 'Akurdi, Pradhikaran' },
          ].map((card, i) => (
            <motion.div
              key={i}
              className={styles.sideCard}
              initial={{ opacity: 0, x: 50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 6, borderColor: 'var(--bronze)' }}
            >
              <div className={styles.sideIcon}>{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </motion.div>
          ))}
          <motion.p
            className={styles.sideNote}
            initial={{ opacity: 0, x: 50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
          >
            Your honest feedback helps us serve you better and helps others discover Rajul Studio.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
