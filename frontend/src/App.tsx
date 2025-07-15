import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LanguageProvider, useLanguage } from './hooks/useLanguage'; // Make sure the filename matches!
import LanguageSelect from './pages/LanguageSelect';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div>Loading...</div></div>;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div>Loading...</div></div>;
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const LanguageGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  if (!language) return <LanguageSelect />;
  return <>{children}</>;
};

function App() {
  return (
    <LanguageProvider>
      <LanguageGate>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/select-language" element={<LanguageSelect />} />
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster position="top-right" />
            </div>
          </Router>
        </AuthProvider>
      </LanguageGate>
    </LanguageProvider>
  );
}

export default App;
