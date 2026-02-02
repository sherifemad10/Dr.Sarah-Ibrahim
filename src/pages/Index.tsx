import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BookingSection from '@/components/BookingSection';
import DoctorSection from '@/components/DoctorSection';
import ServicesSection from '@/components/ServicesSection';
import CasesSection from '@/components/CasesSection';
import OffersSection from '@/components/OffersSection';
import VideosSection from '@/components/VideosSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <BookingSection />
          <DoctorSection />
          <ServicesSection />
          <CasesSection />
          <OffersSection />
          <VideosSection />
          <ReviewsSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
