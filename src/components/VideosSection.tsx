import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import plasma from '@/assets/plasma.jpeg';
import whitening from '@/assets/smile.jpeg';
import breath from '@/assets/badBrath.jpeg';
import tools from '@/assets/tools.jpeg';
import Vplasma from '@/assets/plasma.mp4';
import Vwhitening from '@/assets/smile.mp4';
import Vbreath from '@/assets/badBrath.mp4';
import Vtools from '@/assets/tools.mp4';



const videos = [
  {
    id: 1,
    titleAr: 'بلازما الاسنان',
    titleEn: 'Plasma of teeth',
    thumbnail: plasma,
    videoUrl: Vplasma,
  },
  {
    id: 2,
    titleAr: 'تبيض المنزلى الاسنان',
    titleEn: 'Home Whitening for Teeth',
    thumbnail: whitening,
    videoUrl: Vwhitening,
  },
  {
    id: 3,
    titleAr: 'خطوات بسيطة للتخلص من رائحة الفم الكريهة ',
    titleEn: 'Simple Steps to Get Rid of Bad Breath',
    thumbnail: breath,
    videoUrl: Vbreath,
  },
  {
    id: 4,
    titleAr: 'بعض الادوات للحفاظ على صحه الاسنان',
    titleEn: 'Some Tools to Keep Your Teeth Healthy',
    thumbnail: tools,
    videoUrl: Vtools,
  },
];

const VideosSection = () => {
  const { t, language } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="videos" className="py-20 dental-gradient relative overflow-hidden">
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
            <span className="dental-text-gradient">{t('videos.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t('videos.subtitle')}</p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveVideo(video.videoUrl)}
              className="dental-card overflow-hidden cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={language === 'ar' ? video.titleAr : video.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-primary-foreground fill-current" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground">
                  {language === 'ar' ? video.titleAr : video.titleEn}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-foreground rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 end-0 text-background hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              {/* Video Player */}
              <video
                src={activeVideo}
                className="w-full h-full"
                autoPlay
                controls
              />
            
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideosSection;
