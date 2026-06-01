'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, User, Sparkles } from 'lucide-react';
import styles from './BookingSection.module.css';

interface BookingSectionProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
  selectedStylist: string;
  setSelectedStylist: (stylist: string) => void;
}

export default function BookingSection({
  selectedService,
  setSelectedService,
  selectedStylist,
  setSelectedStylist,
}: BookingSectionProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // For slide transitions (1 = forward, -1 = backward)
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-scroll logic if user selects service/stylist from external sections
  useEffect(() => {
    if (selectedService) {
      setStep(1); // Ensure we show service step
    }
  }, [selectedService]);

  useEffect(() => {
    if (selectedStylist) {
      setStep(2); // Go to stylist selection
    }
  }, [selectedStylist]);

  const services = [
    { name: 'Hair Styling', icon: '✂️' },
    { name: 'Hair Colour', icon: '🎨' },
    { name: 'Facial & Skin', icon: '💆' },
    { name: 'Nail Studio', icon: '💅' },
    { name: 'Bridal Package', icon: '🧖' },
    { name: 'Hair Spa', icon: '🌿' },
  ];

  const stylists = [
    { name: 'Priya Sharma', role: 'Senior Stylist' },
    { name: 'Anita Desai', role: 'Colour Specialist' },
    { name: 'Rekha Nair', role: 'Skin & Nail Expert' },
    { name: 'Sneha Kulkarni', role: 'Bridal Artist' },
    { name: 'Any Available', role: 'Fastest booking' },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const nextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedStylist) return;
    if (step === 3 && (!selectedDate || !selectedTime)) return;
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleConfirm = () => {
    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }
    setIsSubmitted(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }
    })
  };

  // Get today's date formatted as YYYY-MM-DD for min-date validation
  const getMinDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <section className={styles.bookingContainer} id="booking">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-tag">Reserve Your Experience</p>
        <h2 className="section-title">Book an Appointment</h2>
      </motion.div>

      <motion.div 
        className={styles.bookingInner}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ boxShadow: "0 25px 60px rgba(176, 125, 74, 0.15)" }}
      >
        {!isSubmitted ? (
          <>
            {/* Steps Progress Indicator */}
            <div className={styles.stepsIndicator}>
              <div 
                className={styles.stepProgress} 
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
              {[
                { label: 'Service', icon: <Sparkles size={14} /> },
                { label: 'Stylist', icon: <User size={14} /> },
                { label: 'Schedule', icon: <Calendar size={14} /> },
                { label: 'Confirm', icon: <Clock size={14} /> }
              ].map((s, idx) => {
                const nodeStep = idx + 1;
                const isCompleted = step > nodeStep;
                const isActive = step === nodeStep;
                return (
                  <div 
                    key={idx} 
                    className={`${styles.stepNode} ${isCompleted ? styles.stepCompleted : ''} ${isActive ? styles.stepActive : ''}`}
                  >
                    {isCompleted ? <Check size={16} /> : nodeStep}
                    <span className={styles.stepLabel}>{s.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Form Panels container with AnimatePresence */}
            <div style={{ position: 'relative', minHeight: '320px' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* STEP 1: Select Service */}
                  {step === 1 && (
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>
                        Select Service
                      </h3>
                      <div className={styles.selectionGrid}>
                        {services.map((item) => (
                          <div
                            key={item.name}
                            className={`${styles.selectCard} ${selectedService === item.name ? styles.selectCardActive : ''}`}
                            onClick={() => setSelectedService(item.name)}
                          >
                            <span className={styles.selectCardIcon}>{item.icon}</span>
                            <span className={styles.selectCardName}>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Select Stylist */}
                  {step === 2 && (
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>
                        Choose Your Expert
                      </h3>
                      <div className={styles.selectionGrid}>
                        {stylists.map((stylist) => (
                          <div
                            key={stylist.name}
                            className={`${styles.selectCard} ${selectedStylist === stylist.name ? styles.selectCardActive : ''}`}
                            onClick={() => setSelectedStylist(stylist.name)}
                          >
                            <div className={styles.selectCardIcon}>✨</div>
                            <div>
                              <div className={styles.selectCardName}>{stylist.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.1rem' }}>
                                {stylist.role}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Choose Schedule */}
                  {step === 3 && (
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>
                        Choose Date & Time
                      </h3>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Date</label>
                        <input
                          type="date"
                          min={getMinDate()}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className={styles.inputField}
                        />
                      </div>

                      <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                        <label className={styles.formLabel}>Available Slots</label>
                        <div className={styles.timeGrid}>
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              className={`${styles.timeBtn} ${selectedTime === slot ? styles.timeBtnActive : ''}`}
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Personal Info & Confirm */}
                  {step === 4 && (
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>
                        Contact Details
                      </h3>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Full Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={styles.inputField}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={styles.inputField}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Special Requests (Optional)</label>
                        <textarea
                          placeholder="Any specific requests, allergies, or notes..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className={styles.textareaField}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className={styles.navRow}>
              <button
                type="button"
                className="btn-outline"
                onClick={prevStep}
                style={{ visibility: step === 1 ? 'hidden' : 'visible', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.6rem' }}
              >
                <ArrowLeft size={14} /> Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !selectedService) ||
                    (step === 2 && !selectedStylist) ||
                    (step === 3 && (!selectedDate || !selectedTime))
                  }
                  style={{ opacity: ((step === 1 && !selectedService) || (step === 2 && !selectedStylist) || (step === 3 && (!selectedDate || !selectedTime))) ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.6rem' }}
                >
                  Next <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleConfirm}
                  disabled={!name || !phone}
                  style={{ opacity: (!name || !phone) ? 0.5 : 1, padding: '0.8rem 2rem' }}
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <motion.div 
            className={styles.successScreen}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.successIcon}>
              <Check size={36} strokeWidth={3} />
            </div>
            <h3 className={styles.successTitle}>Booking Requested!</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '400px' }}>
              Thank you, {name}! Your luxury treatment reservation request has been submitted. We will confirm your slot via WhatsApp.
            </p>

            <div className={styles.successSummary}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Service</span>
                <span className={styles.summaryVal}>{selectedService}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Specialist</span>
                <span className={styles.summaryVal}>{selectedStylist}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Date</span>
                <span className={styles.summaryVal}>{selectedDate}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Time</span>
                <span className={styles.summaryVal}>{selectedTime}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                setSelectedService('');
                setSelectedStylist('');
                setSelectedDate('');
                setSelectedTime('');
                setName('');
                setPhone('');
                setNotes('');
              }}
              className="btn-outline"
              style={{ marginTop: '1rem' }}
            >
              Book Another Service
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
