import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Pill, Stethoscope, Sparkles, Sun, Crown, Smile } from 'lucide-react';

const services = [
  { key: 'filling', icon: Pill },
  { key: 'rootCanal', icon: Stethoscope },
  { key: 'cleaning', icon: Sparkles },
  { key: 'whitening', icon: Sun },
  { key: 'crowns', icon: Crown },
  { key: 'orthodontics', icon: Smile },
];

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 start-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

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
            {t('services.title')} <span className="dental-text-gradient">{t('services.subtitle')}</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="dental-card p-8 text-center group"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                <service.icon className="w-10 h-10 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t(`services.${service.key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {t(`services.${service.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
