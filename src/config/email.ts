import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('zBrfRYm9bZQZHsiw_');

interface BookingData {
  name: string;
  phone: string;
  date: string;
  time: string;
  queueNumber: number;
}

export const sendBookingEmail = async (bookingData: BookingData): Promise<void> => {
  try {
    const result = await emailjs.send(
      'service_x0adeog',
      'template_xmnhczg',
      {
        name: bookingData.name,
        phone: bookingData.phone,
        date: bookingData.date,
        time: bookingData.time,
        number: bookingData.queueNumber.toString(),
      }
    );
    console.log('Email sent successfully:', result);
    return result as unknown as void;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};