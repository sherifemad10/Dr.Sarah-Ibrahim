import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عنا',
    'nav.services': 'الخدمات',
    'nav.cases': 'الحالات',
    'nav.offers': 'العروض',
    'nav.videos': 'الفيديوهات',
    'nav.reviews': 'التقييمات',
    
    // Hero
    'hero.title': 'الطريقة التي نؤمن بها',
    'hero.subtitle': 'طب الأسنان كما يجب أن يكون',
    'hero.badge1': 'أفضل خدمة',
    'hero.badge2': 'سريع',
    'hero.badge3': 'مريح',
    'hero.cta': 'احجز موعد',
    
    // Booking
    'booking.title': 'احجز موعدك',
    'booking.name': 'الاسم الكامل',
    'booking.phone': 'رقم الهاتف',
    'booking.date': 'التاريخ',
    'booking.time': 'الوقت',
    'booking.submit': 'احجز الآن',
    'booking.selectDate': 'اختر التاريخ',
    'booking.selectTime': 'اختر الوقت',
    'booking.queue': 'أنت رقم {number} اليوم',
    'booking.queueNote': 'كل حالة تستغرق 30 دقيقة على الأقل',
    'booking.success': 'تم حجز موعدك بنجاح!',
    'booking.onlyWeekends': 'متاح أيام السبت والأحد فقط',
    
    // Doctor
    'doctor.title': "دكتورة ساره ابراهيم",
    'doctor.description': 'طبيبة أسنان بخبرة تزيد عن 5 سنوات في تقويم الأسنان وعلاج جذور الأسنان، تمتلك مهارات متقدمة في Dental Motion وDigital Dentistry، مع قدرة عالية على تشخيص الحالات بدقة وتقديم خطط علاجية حديثة قائمة على التقنيات الرقمية لتحقيق أفضل النتائج العلاجية.',
    'doctor.subtitle': 'طبيبة أسنان محترفة',
    'doctor.exp1': 'خبرة 5+ سنوات',
    'doctor.exp2': 'تجميل الأسنان',
    'doctor.exp3': ' تقويم الأسنان',
    'doctor.exp4': 'علاج الجذور',
    'doctor.exp5': 'Dental Motion',
    'doctor.exp6': 'Digital Dentistry',
    
    
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'ما يمكننا تقديمه لك',
    'services.filling.title': 'حشو الأسنان',
    'services.filling.desc': 'حشوات عالية الجودة للحفاظ على صحة أسنانك',
    'services.rootCanal.title': 'علاج الجذور',
    'services.rootCanal.desc': 'علاج متقدم لإنقاذ أسنانك المصابة',
    'services.cleaning.title': 'تنظيف الأسنان',
    'services.cleaning.desc': 'تنظيف احترافي لابتسامة مشرقة',
    'services.whitening.title': 'تبييض الأسنان',
    'services.whitening.desc': 'احصل على ابتسامة بيضاء ناصعة',
    'services.crowns.title': 'تركيب طربوش',
    'services.crowns.desc': 'طربوش عالية الجودة لحماية أسنانك',
    'services.orthodontics.title': 'تقويم الاسنان',
    'services.orthodontics.desc': 'تقويم الاسنان لتحسين ابتسامتك',
    
    // Cases
    'cases.title': 'حالات قبل وبعد',
    'cases.subtitle': 'شاهد نتائج عملنا',
    'cases.before': 'قبل',
    'cases.after': 'بعد',
    
    // Offers
    'offers.title': 'عروضنا الخاصة',
    'offers.subtitle': 'استفد من أفضل العروض',
    'offers.book': 'احجز العرض',
    'offers.discount': 'خصم',
    
    // Videos
    'videos.title': 'فيديوهات تعليمية',
    'videos.subtitle': 'تعلم المزيد عن صحة أسنانك',
    
    // Reviews
    'reviews.title': 'آراء مرضانا',
    'reviews.subtitle': 'ماذا يقولون عنا',
    'reviews.add': 'أضف تقييمك',
    'reviews.name': 'اسمك',
    'reviews.comment': 'تعليقك',
    'reviews.submit': 'إرسال التقييم',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.clinic': 'عيادة الأسنان',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.cases': 'Cases',
    'nav.offers': 'Offers',
    'nav.videos': 'Videos',
    'nav.reviews': 'Reviews',
    
    // Hero
    'hero.title': 'The way we believe',
    'hero.subtitle': 'Dentistry should be',
    'hero.badge1': 'Best Service',
    'hero.badge2': 'Fast',
    'hero.badge3': 'Comfortable',
    'hero.cta': 'Book Appointment',
    
    // Booking
    'booking.title': 'Book an Appointment',
    'booking.name': 'Full Name',
    'booking.phone': 'Phone Number',
    'booking.date': 'Date',
    'booking.time': 'Time',
    'booking.submit': 'Book Now',
    'booking.selectDate': 'Select Date',
    'booking.selectTime': 'Select Time',
    'booking.queue': 'You are number {number} today',
    'booking.queueNote': 'Each case takes at least 30 minutes',
    'booking.success': 'Your appointment has been booked successfully!',
    'booking.onlyWeekends': 'Available on Saturday and Sunday only',
    
    // Doctor
    'doctor.title': 'Dr. Sara Ibrahim',
    'doctor.description': 'Dental Specialist with over 5 years of experience in orthodontics and endodontics, advanced skills in Dental Motion and Digital Dentistry, and high accuracy in diagnosing cases and providing modern treatment plans based on digital technology to achieve the best treatment results.',
    'doctor.subtitle': 'Professional Dentist',
    'doctor.exp1': '5+ Years Experience',
    'doctor.exp2': 'Cosmetic Dentistry',
    'doctor.exp3': 'Orthodontics',
    'doctor.exp4': 'Endodontics',
    'doctor.exp5': 'Dental Motion',
    'doctor.exp6': 'Digital Dentistry',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'What we can offer you',
    'services.filling.title': 'Dental Filling',
    'services.filling.desc': 'High-quality fillings to maintain your dental health',
    'services.rootCanal.title': 'Root Canal',
    'services.rootCanal.desc': 'Advanced treatment to save your affected teeth',
    'services.cleaning.title': 'Teeth Cleaning',
    'services.cleaning.desc': 'Professional cleaning for a bright smile',
    'services.whitening.title': 'Teeth Whitening',
    'services.whitening.desc': 'Get a bright white smile',
    'services.crowns.title': 'Crowns',
    'services.crowns.desc': 'High-quality crowns to protect your teeth',
    'services.orthodontics.title': 'Orthodontics',
    'services.orthodontics.desc': 'Orthodontic treatment to improve your smile',
    // Cases
    'cases.title': 'Before & After Cases',
    'cases.subtitle': 'See our work results',
    'cases.before': 'Before',
    'cases.after': 'After',
    
    // Offers
    'offers.title': 'Special Offers',
    'offers.subtitle': 'Take advantage of the best deals',
    'offers.book': 'Book Offer',
    'offers.discount': 'OFF',
    
    // Videos
    'videos.title': 'Educational Videos',
    'videos.subtitle': 'Learn more about your dental health',
    
    // Reviews
    'reviews.title': 'Patient Reviews',
    'reviews.subtitle': 'What they say about us',
    'reviews.add': 'Add Your Review',
    'reviews.name': 'Your Name',
    'reviews.comment': 'Your Comment',
    'reviews.submit': 'Submit Review',
    
    // Footer
    'footer.rights': 'All Rights Reserved',
    'footer.clinic': 'Dental Clinic',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.style.fontFamily = isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif";
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
