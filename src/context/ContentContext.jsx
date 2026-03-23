// src/context/ContentContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const DEFAULT_CONTENT = {
  hero: {
    title: 'Own Property.',
    titleAccent: 'Earn Like Equity.',
    subtitle: 'Global Investment Ecosystem',
    description: 'PROEVERON connects visionary investors with premium real estate opportunities across India, UAE, and USA — delivering world-class returns.',
    videoUrl: 'https://videos.pexels.com/video-files/3811499/3811499-uhd_2560_1440_25fps.mp4',
    ctaPrimary: 'Explore Projects',
    ctaSecondary: 'Invest Now',
  },
  about: {
    title: 'Structured Real Estate Investments with Predictable Returns',
    subtitle: 'Built on Trust, Driven by Vision',
    description: 'PROEVERON connects investors to high-growth real estate across India, UAE & USA — combining asset ownership with equity-style returns, backed by structured models and transparent execution.',
    stats: [
      { label: 'Crores Invested', value: '500+' },
      { label: 'Happy Investors', value: '2000+' },
      { label: 'Projects Delivered', value: '45+' },
      { label: 'Countries', value: '3' },
    ],
  },
  ecosystem: [
    { title: 'PROEVERON Realty', desc: 'Premium residential & commercial projects across tier-1 cities.', icon: '🏙️' },
    { title: 'RealQuity', desc: 'Fractional ownership — invest in luxury properties from ₹20 Lakhs.', icon: '📈' },
    { title: 'Axel Wellness', desc: 'Wellness-integrated living spaces redefining modern lifestyle.', icon: '🌿' },
    { title: 'TeQZen', desc: 'AI-powered property analytics and smart investment insights.', icon: '🤖' },
  ],
  whyInvest: [
    { title: 'Clear Legal Titles', desc: 'Every project is RERA registered with 100% transparent documentation.', icon: '📜' },
    { title: 'High ROI Locations', desc: 'Prime locations in growth corridors delivering 15–28% annual returns.', icon: '📊' },
    { title: 'Clear Exit Strategy', desc: 'Defined exit options including buyback guarantees and secondary markets.', icon: '🚪' },
    { title: 'Professional Execution', desc: 'ISO-certified construction with international quality standards.', icon: '🏗️' },
    { title: 'Diversified Portfolio', desc: 'Spread investments across multiple asset classes for risk mitigation.', icon: '💼' },
    { title: 'Global Presence', desc: 'Operations in India, UAE & USA — your investment knows no borders.', icon: '🌍' },
  ],
  testimonials: [
    { name: 'Rajesh Sharma', role: 'Entrepreneur, Hyderabad', quote: 'PROEVERON transformed my investment strategy. My ₹50L grew to ₹78L in 2 years. The transparency and ROI are unmatched.', avatar: 'RS', rating: 5 },
    { name: 'Priya Menon', role: 'NRI Investor, Dubai', quote: 'As an NRI, I was looking for a trustworthy partner for India investments. PROEVERON exceeded every expectation.', avatar: 'PM', rating: 5 },
    { name: 'Vikram Nair', role: 'IT Professional, Bangalore', quote: 'Fractional ownership through RealQuity allowed me to invest in luxury properties I thought were beyond my reach.', avatar: 'VN', rating: 5 },
    { name: 'Ananya Krishnan', role: 'Doctor, Chennai', quote: 'The ROI calculator helped me plan my investment perfectly. The returns have been consistent and the team is always responsive.', avatar: 'AK', rating: 5 },
  ],
  cta: {
    title: 'Start Your Investment Journey Today',
    description: 'Join 2000+ investors already building wealth with PROEVERON. Book a free consultation today.',
    whatsapp: '+919876543210',
    phone: '+919876543210',
    email: 'invest@proeveron.com',
  },
  seo: {
    title: 'PROEVERON — Global Real Estate Investment Platform',
    description: 'Invest in premium real estate across India, UAE & USA. Fractional ownership, guaranteed ROI, and transparent investments.',
    keywords: 'real estate investment, fractional ownership, PROEVERON, property investment India, NRI investment',
  },
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsubscribe = null;
    const connectFirebase = async () => {
      try {
        const [{ db }, { doc, onSnapshot, setDoc }] = await Promise.all([
          import('../firebase/config'),
          import('firebase/firestore'),
        ]);
        unsubscribe = onSnapshot(
          doc(db, 'siteContent', 'main'),
          (snap) => {
            if (snap.exists()) {
              setContent((prev) => ({ ...DEFAULT_CONTENT, ...snap.data() }));
            }
            setLoading(false);
          },
          (err) => {
            console.warn('Firestore not connected, using default content:', err.message);
            setLoading(false);
          }
        );
      } catch (err) {
        console.warn('Firebase not configured, using default content.');
        setLoading(false);
      }
    };
    connectFirebase();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const updateContent = useCallback(async (section, data) => {
    try {
      const [{ db }, { doc, setDoc }] = await Promise.all([
        import('../firebase/config'),
        import('firebase/firestore'),
      ]);
      await setDoc(doc(db, 'siteContent', 'main'), { [section]: data }, { merge: true });
    } catch (err) {
      console.warn('Could not update Firestore:', err.message);
      // Update locally as fallback
      setContent((prev) => ({ ...prev, [section]: data }));
    }
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};
