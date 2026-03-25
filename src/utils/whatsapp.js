// WhatsApp utility function
export const openWhatsApp = (message = '') => {
  const phoneNumber = '919063272652'; // +91 90632 72652 without + and spaces
  const encodedMessage = encodeURIComponent(message || 'Hi, I\'m interested in learning more about PROEVERON.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
