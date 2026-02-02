import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Star, User, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import maleAvatar from '@/assets/man.png';
import femaleAvatar from '@/assets/famale.png';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
  gender?: 'male' | 'female';
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    rating: 5,
    comment: 'تجربة رائعة! الدكتورة سارة محترفة جداً والعيادة نظيفة ومريحة.',
    gender: 'male',
  },
  {
    id: 2,
    name: 'سارة أحمد',
    rating: 5,
    comment: 'أفضل عيادة أسنان زرتها. الخدمة ممتازة والأسعار معقولة.',
    gender: 'female',
  },
  {
    id: 3,
    name: 'محمد علي',
    rating: 4,
    comment: 'تعامل راقي وعلاج احترافي. أنصح الجميع بزيارة العيادة.',
    gender: 'male',
  },
  {
    id: 4,
    name: ' شريف عماد',
    rating: 5,
    comment: "أشكر الدكتورة سارة على كل اهتمامها ❤️. بجد أشطر دكتورة، وخبرتها وتعاملها الجميل بيخلي كل زيارة مريحة وسعيدة. انصح اي حد عايز يحافظ على سنانه أو يحل أي مشكلة، دكتورة سارة هي الحل!",
    gender: 'male',
  },
  {
    id: 5,
    name: "مريم احمد",
    rating:5,
    comment:'افضل و اجمل دكتوره بتهتم بادق التفاصيل و تستخدم احدث الوسائل و افضل طرق التعقيم',
    gender:'female'


  }
];

const STORAGE_KEY = 'smile-bright-clinic-reviews';

// Vite may return image URL as string or { default: string }
const getImageUrl = (url: string | { default: string }): string =>
  typeof url === 'string' ? url : url.default;

const ReviewsSection = () => {
  const { t, isRTL } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  // const [name, setName] = useState('');
  // const [comment, setComment] = useState('');
  // const [rating, setRating] = useState(5);
  // const [hoveredRating, setHoveredRating] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [avatarErrorIds, setAvatarErrorIds] = useState<Set<number>>(new Set());

  const handleAvatarError = (id: number) => {
    setAvatarErrorIds((prev) => new Set(prev).add(id));
  };

  useEffect(() => {
    try {
      const savedReviews = localStorage.getItem(STORAGE_KEY);
      if (savedReviews) {
        const parsedReviews = JSON.parse(savedReviews);
        // Ensure every review has gender (for old data saved before gender was added)
        const withGender = parsedReviews.map((r: Review) => ({
          ...r,
          gender: r.gender ?? (r.id === 2 ? 'female' : 'male'),
        }));
        // عرض كل الريفيوهات: نبدأ بـ initialReviews ثم نضيف أي ريفيو محفوظ غير موجود فيها
        const initialIds = new Set(initialReviews.map((r) => r.id));
        const extraFromStorage = withGender.filter((r) => !initialIds.has(r.id));
        const allReviews = [...initialReviews, ...extraFromStorage];
        setReviews(allReviews);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
      } else {
        setReviews(initialReviews);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReviews));
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews(initialReviews);
    }
  }, []);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!name.trim() || !comment.trim()) {
  //     toast({
  //       title: isRTL ? 'خطأ' : 'Error',
  //       description: isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
  //       variant: 'destructive',
  //     });
  //     return;
  //   }

  //   const newReview: Review = {
  //     id: Date.now(),
  //     name: name.trim(),
  //     rating,
  //     comment: comment.trim(),
  //     gender: 'male', // default; add gender state + select in form to let user choose
  //   };

  //   const updatedReviews = [newReview, ...reviews];
  //   setReviews(updatedReviews);
    
  //   try {
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
  //   } catch (error) {
  //     console.error('Error saving review:', error);
  //   }
    
  //   setName('');
  //   setComment('');
  //   setRating(5);

  //   toast({
  //     title: isRTL ? 'شكراً لك!' : 'Thank you!',
  //     description: isRTL ? 'تم إضافة تقييمك بنجاح' : 'Your review has been added successfully',
  //   });
  // };

  return (
    <section id="reviews" className="py-20 bg-background relative overflow-hidden container mx-auto">
      {/* Background Decorations */}
      <div className="absolute top-20 end-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 start-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="w-full px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="dental-section-title mb-4">
            <span className="dental-text-gradient">{t('reviews.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t('reviews.subtitle')}</p>
        </motion.div>

        {/* Reviews carousel - full width section */}
        <div
          className="w-full overflow-hidden cursor-default"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          <div
            className={`flex gap-8 pb-2 animate-reviews-slide ${isCarouselHovered ? 'paused' : ''}`}
            style={{ width: 'max-content' }}
          >
            {/* Duplicate reviews for seamless infinite scroll */}
            {[1, 2].map((copy) => (
              <div key={copy} className="flex gap-8 shrink-0">
                {reviews.map((review, index) => (
                  <motion.div
                    key={`${copy}-${review.id}`}
                    initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="dental-card p-8 min-w-[420px] w-[420px] shrink-0 flex flex-col items-center text-center"
                  >
                    {/* Avatar: man image if male, woman image if female, else default icon */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mb-4 ring-2 ring-primary/20 border-2 border-white">
                      {(review.gender === 'male' || review.gender === 'female') && !avatarErrorIds.has(review.id) ? (
                        <img
                          src={getImageUrl(review.gender === 'male' ? maleAvatar : femaleAvatar)}
                          alt={review.name}
                          className="absolute inset-0 w-full h-full object-cover block"
                          onError={() => handleAvatarError(review.id)}
                        />
                      ) : (
                        <User className="w-8 h-8 text-primary-foreground shrink-0" />
                      )}
                    </div>
                    {/* Name */}
                    <h4 className="font-semibold text-foreground text-lg mb-2">{review.name}</h4>
                    {/* Rating */}
                    <div className="flex gap-0.5 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    {/* Review */}
                    <p className="text-muted-foreground text-base leading-relaxed">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Add Review Form */}
          {/* <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="dental-card p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">{t('reviews.add')}</h3>

            <form onSubmit={handleSubmit} className="space-y-6"> */}
              {/* Name Input */}
              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('reviews.name')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dental-input"
                  maxLength={50}
                />
              </div> */}

              {/* Rating */}
              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isRTL ? 'التقييم' : 'Rating'}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-muted'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Comment */}
              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('reviews.comment')}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="dental-input resize-none"
                  maxLength={500}
                />
              </div> */}

              {/* Submit Button */}
              {/* <button
                type="submit"
                className="dental-btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {t('reviews.submit')}
              </button> */}
            {/* </form>
          </motion.div> */}
      </div>
    </section>
  );
};

export default ReviewsSection;
