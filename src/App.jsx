// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminSignupPage from './pages/AdminSignupPage';
import RealEquityPage from './pages/RealEquityPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminLeads from './pages/admin/AdminLeads';
import AdminInvestors from './pages/admin/AdminInvestors';
import AdminCMS from './pages/admin/AdminCMS';
import AdminSettings from './pages/admin/AdminSettings';

// Pages that use their own Navbar/Footer
const STANDALONE_ROUTES = ['/login', '/register', '/admin', '/admin-signup'];

function MainLayout({ children, pathname }) {
  const isStandalone = STANDALONE_ROUTES.some((r) => pathname.startsWith(r));
  return (
    <>
      {!isStandalone && <Navbar />}
      {children}
      {!isStandalone && <Footer />}
      <WhatsAppButton />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages (no navbar/footer) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin-signup" element={<AdminSignupPage />} />

      {/* Admin panel */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="investors" element={<AdminInvestors />} />
        <Route path="investments" element={<AdminInvestors />} />
        <Route path="cms" element={<AdminCMS />} />
        <Route path="media" element={<MediaPlaceholder />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Public + Protected pages (with navbar/footer) */}
      <Route path="/" element={<><Navbar /><HomePage /><Footer /><WhatsAppButton /></>} />
      <Route path="/realequity" element={<><Navbar /><RealEquityPage /><Footer /><WhatsAppButton /></>} />
      <Route path="/projects" element={<><Navbar /><ProjectsPage /><Footer /><WhatsAppButton /></>} />
      <Route path="/projects/:id" element={<><Navbar /><ProjectDetailPage /><Footer /><WhatsAppButton /></>} />
      <Route path="/dashboard" element={<><Navbar /><DashboardPage /><Footer /><WhatsAppButton /></>} />
      <Route path="/about" element={<><Navbar /><AboutPage /><Footer /><WhatsAppButton /></>} />
      <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /><WhatsAppButton /></>} />
      <Route path="*" element={<><Navbar /><NotFoundPage /><Footer /></>} />
    </Routes>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: '#070f22' }}>
      <div className="text-center">
        <h1 className="font-cinzel font-bold text-4xl text-white mb-4">{title}</h1>
        <p className="text-white/50">This page is coming soon.</p>
      </div>
    </div>
  );
}

function MediaPlaceholder() {
  return (
    <div className="p-8">
      <h1 className="font-cinzel font-bold text-3xl text-white mb-4">Media Library</h1>
      <div className="glass rounded-2xl p-12 text-center">
        <div className="text-6xl mb-4">🖼️</div>
        <h3 className="font-cinzel font-bold text-xl text-white mb-2">Media Library</h3>
        <p className="text-white/50">Connect Firebase Storage to manage images, videos, and brochures here.</p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: '#070f22' }}>
      <div className="text-center">
        <div className="font-cinzel font-bold text-8xl text-yellow-400 mb-4">404</div>
        <h1 className="font-cinzel font-bold text-3xl text-white mb-4">Page Not Found</h1>
        <p className="text-white/50 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-gold px-8 py-3 rounded-full font-semibold">Go Home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <AppRoutes />
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
