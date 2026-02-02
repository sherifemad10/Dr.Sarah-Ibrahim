import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import beforeImage from '@/assets/before1.jpeg';
import afterImage from '@/assets/after1.jpeg';
import beforeImage2 from '@/assets/before2.jpeg';
import afterImage2 from '@/assets/after2.jpeg';
import beforeImage3 from '@/assets/before3.jpeg';
import afterImage3 from '@/assets/after3.jpeg';
import beforeImage4 from '@/assets/before4.jpeg';
import afterImage4 from '@/assets/after4.jpeg';

const cases = [
  {
    id: 1,
    before: beforeImage,
    after: afterImage,
  },
  {
    id: 2,
    before: beforeImage2,
    after: afterImage2,
  },
  {
    id: 3,
    before: beforeImage3,
    after: afterImage3,
  },
  {
    id: 4,
    before: beforeImage4,
    after: afterImage4,
  },
];

const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = ((clientX - rect.left) / rect.width) * 100;
    if (isRTL) x = 100 - x;
    x = Math.max(0, Math.min(100, x));
    setSliderPosition(x);
  };

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  const handleEnd = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        loading="lazy"
        draggable={false}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: isRTL ? `${100 - sliderPosition}%` : `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          loading="lazy"
          draggable={false}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            width: containerRef.current?.offsetWidth || '100%',
            maxWidth: 'none'
          }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary-foreground cursor-ew-resize"
        style={{ 
          [isRTL ? 'right' : 'left']: `${sliderPosition}%`,
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <GripVertical className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 start-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm font-medium">
        {t('cases.before')}
      </div>
      <div className="absolute bottom-4 end-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
        {t('cases.after')}
      </div>
    </div>
  );
};

const CasesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="cases" className="py-20 dental-gradient relative overflow-hidden">
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
            <span className="dental-text-gradient">{t('cases.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t('cases.subtitle')}</p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="dental-card p-4"
            >
              <BeforeAfterSlider
                beforeImage={caseItem.before}
                afterImage={caseItem.after}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
