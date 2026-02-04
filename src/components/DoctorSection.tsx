import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Award, Sparkles, Heart, Star } from 'lucide-react';
import doctorImage from '@/assets/so2.jpeg';

const DoctorSection = () => {
  const { t, isRTL } = useLanguage();

  const experiences = [
    { key: 'doctor.exp1', icon: Award },
    { key: 'doctor.exp2', icon: Sparkles },
    { key: 'doctor.exp3', icon: Star },
    { key: 'doctor.exp4', icon: Heart },
    { key: 'doctor.exp5', icon: Sparkles },
    { key: 'doctor.exp6', icon: Star },
  ];

  return (
    <section id="about" className="py-20 dental-gradient relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 start-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 end-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Doctor Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl transform scale-105" />
              <img
                src={doctorImage}
                alt="Dr. Sara"
                draggable={false}
                loading="lazy"
                className="relative w-80 lg:w-96 rounded-3xl shadow-card object-cover"
              />
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-4 -end-4 bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-card"
              >
                <span className="font-bold text-lg">5+</span>
                <span className="block text-sm opacity-90">
                  {isRTL ? 'سنوات خبرة' : 'Years Exp.'}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Doctor Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="dental-section-title mb-2 text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {t('doctor.title')}
            </h2>
            <p className="text-base md:text-lg py-4 mb-8 text-foreground/90 leading-relaxed">
              {t('doctor.description')}
            </p>
            <p className="text-xl md:text-2xl text-primary font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              {t('doctor.subtitle')}
            </p>

            {/* Experience Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="dental-card p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <exp.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{t(exp.key)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
