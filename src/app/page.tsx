'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import TeamSection from '@/components/TeamSection';
import BookingSection from '@/components/BookingSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedStylist, setSelectedStylist] = useState('');

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    
    // Smooth scroll to booking
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStylist = (stylistName: string) => {
    setSelectedStylist(stylistName);
    
    // Smooth scroll to booking
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        
        <ServicesSection 
          onSelectService={handleSelectService} 
        />
        
        <GallerySection />
        
        <TeamSection 
          onSelectStylist={handleSelectStylist} 
        />
        
        <BookingSection 
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedStylist={selectedStylist}
          setSelectedStylist={setSelectedStylist}
        />
        
        <ReviewsSection />
        
        <ContactSection />
      </main>
    </>
  );
}
