import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Tag, Sparkles, Percent } from 'lucide-react';

const offers = [
  {
    id: 1,
    titleAr: 'تبييض الأسنان',
    titleEn: 'Teeth Whitening',
    descAr: 'احصل على ابتسامة بيضاء ناصعة مع عرض التبييض الخاص',
    descEn: 'Get a bright white smile with our special whitening offer',
    discount: 30,
    icon: Sparkles,
  },
  {
    id: 2,
    titleAr: 'فحص شامل',
    titleEn: 'Full Checkup',
    descAr: 'فحص شامل للأسنان واللثة مع تنظيف مجاني',
    descEn: 'Complete teeth and gums checkup with free cleaning',
    discount: 20,
    icon: Tag,
  },
  {
    id: 3,
    titleAr: 'حشو عصب',
    titleEn: 'Root Canal Treatment',
    descAr: 'خصم خاص على حشو عصب',
    descEn: 'Special discount on all types of root canal treatment',
    discount: 25,
    icon: Percent,
  },
];

const OffersSection = () => {
  const { t, language, isRTL } = useLanguage();

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offers" className="py-20 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 start-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="dental-section-title mb-4">
            <span className="dental-text-gradient">{t('offers.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t('offers.subtitle')}</p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="dental-card p-6 relative overflow-hidden group"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 end-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                {offer.discount}% {t('offers.discount')}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                <offer.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {language === 'ar' ? offer.titleAr : offer.titleEn}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === 'ar' ? offer.descAr : offer.descEn}
              </p>

              {/* CTA */}
              <button
                onClick={scrollToBooking}
                className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                {t('offers.book')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
