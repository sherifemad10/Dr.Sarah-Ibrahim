import { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle, Mail, ChevronLeft, ChevronRight, Globe, Video } from 'lucide-react';
import { sendBookingEmail } from '@/config/email';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isSaturday, isTuesday, isPast, isToday, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Simulated booking storage (in a real app, this would be a database)
const bookings: Record<string, number> = {};

const BookingSection = () => {
  const { t, language, isRTL } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [queueNumber, setQueueNumber] = useState<number | null>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');

  const formatTime = (hour: number, minute: number, format: '12h' | '24h'): string => {
    if (format === '12h') {
      const period = hour >= 12 ? 'pm' : 'am';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour}:${minute.toString().padStart(2, '0')}${period}`;
    }
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const timeSlots = useMemo(() => {
    const slots = [];
    // Evening slots: 5:00pm (17:00) to 10:00pm (22:00)
    for (let hour = 17; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute > 0) break; // Stop at 22:00, don't include 22:30
        const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const display = formatTime(hour, minute, timeFormat);
        slots.push({ value, display });
      }
    }
    return slots;
  }, [timeFormat]);

  const isDateDisabled = (date: Date) => {
    if (isPast(date) && !isToday(date)) return true;
    // Only allow Saturday and Tuesday
    if (!isSaturday(date) && !isTuesday(date)) return true;
    return false;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setPhone(value);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setTime('');
    setQueueNumber(null);
  };

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    if (date) {
      const bookingKey = `${format(date, 'yyyy-MM-dd')}_${selectedTime}`;
      const existingBookings = bookings[bookingKey] || 0;
      setQueueNumber(existingBookings + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !date || !time) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
        variant: 'destructive',
      });
      return;
    }

    // Validate phone number (only numbers allowed, 10-15 digits)
    if (phone.length < 10 || phone.length > 15) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'رقم الهاتف يجب أن يكون بين 10 و 15 رقم' : 'Phone number must be between 10 and 15 digits',
        variant: 'destructive',
      });
      return;
    }

    // Update booking count
    const bookingKey = `${format(date, 'yyyy-MM-dd')}_${time}`;
    bookings[bookingKey] = (bookings[bookingKey] || 0) + 1;
    const finalQueueNumber = bookings[bookingKey];

    // Create booking data
    const dateStr = format(date, 'PPP', { locale: language === 'ar' ? ar : enUS });
    const bookingData = {
      name,
      phone,
      date: dateStr,
      time,
      queueNumber: finalQueueNumber,
    };

    // Send email
    sendBookingEmail(bookingData)
      .then(() => {
        toast({
          title: isRTL ? 'نجح' : 'Success',
          description: isRTL ? 'تم الحجز بنجاح سيتم التواصل مع قبل الموعد بنصف ساعة شكرا لثقتك الغاليه' : 'Booking request sent successfully . We will contact you 30 minutes before your appointment. Thank you for your trust.',
        });
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setName('');
          setPhone('');
          setDate(undefined);
          setTime('');
          setQueueNumber(null);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        toast({
          title: isRTL ? 'خطأ' : 'Error',
          description: isRTL ? 'فشل إرسال البريد الإلكتروني' : 'Failed to send email',
          variant: 'destructive',
        });
      });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    // Get day of week (0 = Sunday, 6 = Saturday)
    // We want Saturday (6) to be the first day, Sunday (0) to be second, etc.
    const firstDay = getDay(start); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Convert to Saturday-first week: Saturday=0, Sunday=1, Monday=2, ..., Friday=6
    const firstDaySaturday = firstDay === 6 ? 0 : firstDay === 0 ? 1 : firstDay + 1;
    
    // Add days from previous month to fill first week (starting from Saturday)
    const prevMonthDays = [];
    for (let i = firstDaySaturday - 1; i >= 0; i--) {
      const date = new Date(start);
      date.setDate(date.getDate() - i - 1);
      prevMonthDays.push(date);
    }
    
    // Add days from next month to fill last week
    const lastDay = getDay(end); // 0 = Sunday, 6 = Saturday
    // Convert to Saturday-first week
    const lastDaySaturday = lastDay === 6 ? 0 : lastDay === 0 ? 1 : lastDay + 1;
    const daysToAdd = 6 - lastDaySaturday;
    const nextMonthDays = [];
    for (let i = 1; i <= daysToAdd; i++) {
      const date = new Date(end);
      date.setDate(date.getDate() + i);
      nextMonthDays.push(date);
    }
    
    return [...prevMonthDays, ...days, ...nextMonthDays];
  };

  return (
    <section id="booking" className="py-20 bg-slate-900 min-h-screen relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 bg-slate-800 rounded-2xl p-8"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">
                {t('booking.success')}
              </h3>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Sidebar - Meeting Details */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3 bg-slate-800 rounded-2xl p-6 space-y-6"
              >
                {/* Logo/Branding */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <h2 className="text-white text-center font-bold text-2xl mb-4">Dr. Sarah Ibrahim</h2>
                </div>

                {/* Meeting Title */}
                <div className="text-center">
<p className="text-white text-center font-bold text-xl mb-4">السبت والثلاثاء</p> 
                       <p className="text-white text-center font-bold text-xl mb-4">من 5:00 مساء حتى 10:00 مساءا</p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">{t('booking.name')}</label>
                    <div className="relative">
                      <User className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t('booking.name')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-700 text-white rounded-lg pl-10 pr-4 py-3 border border-slate-600 focus:border-slate-400 focus:outline-none"
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm mb-2">{t('booking.phone')}</label>
                    <div className="relative">
                      <Phone className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        placeholder={t('booking.phone')}
                        value={phone}
                        onChange={handlePhoneChange}
                        onKeyPress={(e) => {
                          // Prevent non-numeric input
                          if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                            e.preventDefault();
                          }
                        }}
                        className="w-full bg-slate-700 text-white rounded-lg pl-10 pr-4 py-3 border border-slate-600 focus:border-slate-400 focus:outline-none"
                        maxLength={15}
                      />
                    </div>
                  </div>

                  {/* Queue Number Display */}
                  {queueNumber && queueNumber > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-700 rounded-lg p-4 text-center"
                    >
                      <p className="text-white font-semibold">
                        {t('booking.queue').replace('{number}', queueNumber.toString())}
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        {t('booking.queueNote')}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    {t('booking.submit')}
                  </button>
                </form>
              </motion.div>

              {/* Center - Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-5 bg-slate-800 rounded-2xl p-6"
              >
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="text-white hover:text-slate-300 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-white font-semibold text-lg">
                    {format(currentMonth, 'MMMM yyyy', { locale: language === 'ar' ? ar : enUS })}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="text-white hover:text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Days of Week - Starting from Saturday */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'].map((day) => (
                    <div key={day} className="text-center text-slate-400 text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth().map((day, index) => {
                    const isSelected = date && format(day, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                    const isDisabled = isDateDisabled(day);
                    const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                    const isOtherMonth = !isCurrentMonth;
                    // Only allow Saturday and Tuesday to be clickable
                    const isAllowedDay = isSaturday(day) || isTuesday(day);

                    return (
                      <button
                        key={index}
                        onClick={() => !isDisabled && isAllowedDay && handleDateSelect(day)}
                        disabled={isDisabled || !isAllowedDay}
                        className={cn(
                          "h-12 rounded-lg text-sm font-medium transition-colors relative",
                          isSelected && "bg-white text-slate-900",
                          !isSelected && !isDisabled && isAllowedDay && "bg-slate-700 text-white hover:bg-slate-600",
                          (isDisabled || !isAllowedDay) && "text-slate-600 cursor-not-allowed opacity-50",
                          isOtherMonth && "text-slate-500"
                        )}
                      >
                        {format(day, 'd')}
                        {isSelected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-900 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right Sidebar - Time Slots */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-4 bg-slate-800 rounded-2xl p-6"
              >
                {date ? (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <h3 className="text-white font-semibold text-xl text-center">
                        {format(date, 'EEE d', { locale: language === 'ar' ? ar : enUS })}
                      </h3>
                      
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                      {timeSlots.map((slot) => {
                        const isSelected = time === slot.value;
                        return (
                          <button
                            key={slot.value}
                            onClick={() => handleTimeSelect(slot.value)}
                            className={cn(
                              "w-full text-left px-4 py-3 rounded-lg border transition-colors",
                              isSelected
                                ? "bg-white text-slate-900 border-white"
                                : "bg-slate-700 text-white border-slate-600 hover:border-slate-500"
                            )}
                          >
                            {slot.display}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <p>{t('booking.selectDate')}</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
