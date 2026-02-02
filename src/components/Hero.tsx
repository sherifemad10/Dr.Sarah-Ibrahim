import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { memo, useCallback } from 'react';
import heroImage from '@/assets/hero.jpeg';

// Memoized decorative SVG components
const DecorationTooth = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="absolute top-32 left-10 w-32 h-32 text-blue-300"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path
        d="M50 10 Q30 10 20 25 Q15 35 15 45 Q15 55 20 65 Q25 75 35 80 Q40 85 45 85 Q50 90 55 85 Q60 85 65 80 Q75 75 80 65 Q85 55 85 45 Q85 35 80 25 Q70 10 50 10 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  </motion.div>
));
DecorationTooth.displayName = 'DecorationTooth';

const DecorationImpression = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.1, scale: 1 }}
    transition={{ duration: 1, delay: 0.7 }}
    className="absolute bottom-20 right-20 w-40 h-24 text-blue-300"
  >
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <rect x="20" y="10" width="160" height="100" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 50 Q100 30 180 50" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  </motion.div>
));
DecorationImpression.displayName = 'DecorationImpression';

const Hero = () => {
  const { t, isRTL } = useLanguage();

  const scrollToBooking = useCallback(() => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="min-h-screen bg-cyan-50/40 pt-20 relative overflow-hidden">
      {/* Decorative Tooth Outline - Top Left */}
      <DecorationTooth />

      {/* Decorative Dental Impression Outline - Bottom Right */}
      <DecorationImpression />

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Section - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6 relative"
          >
            {/* Small Tilted Image 1 - Top Left */}
            <motion.div
              initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-8 -left-4 w-32 h-40 lg:w-40 lg:h-48 z-10"
            >
              <div className="relative w-full h-full transform rotate-[-8deg]">
                <img
                  src={heroImage}
                  alt="Patient brushing teeth"
                  className="w-full h-full object-cover rounded-lg border-4 border-white shadow-lg"
                />
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="pt-32 flex flex-col items-center justify-center lg:pt-40 space-y-6">
              <h1 className="text-4xl text-center lg:text-5xl xl:text-6xl font-bold text-slate-800 leading-tight">
                Your trusted professional dentist
              </h1>

              <p className="text-base lg:text-lg text-slate-700 leading-relaxed max-w-lg">
                Enjoy dental care experience, that you feel comfortable with our first dental professionals and that you look awesome.
              </p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={scrollToBooking}
                className="bg-pink-200 hover:bg-pink-300 text-slate-800 px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide shadow-md transition-colors"
              >
                {t('hero.cta') || 'APPOINTMENT'}
              </motion.button>
            </div>
          </motion.div>

          {/* Center/Right Section - Main Image and Accreditation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 relative flex items-center justify-center"
          >
            {/* Pink Circular Background */}
            <div className="absolute w-[600px] h-[600px] lg:w-[700px] lg:h-[700px] bg-pink-200/50 rounded-full -z-10 blur-3xl" />

            {/* Main Dentist Image */}
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Professional Dentist"
                className="w-full max-w-lg lg:max-w-2xl h-auto object-contain"
                loading="eager"
              />

            
            </div>

          
          

            {/* Small Tilted Image 2 - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 8, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-0 right-0 lg:right-8 w-32 h-32 lg:w-40 lg:h-40 z-20"
            >
              <div className="relative w-full h-full transform rotate-[8deg]">
                <img
                  src={heroImage}
                  alt="Dental aligners"
                  className="w-full h-full object-cover rounded-lg border-4 border-white shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
