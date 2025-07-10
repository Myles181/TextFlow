import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute, AuthRoute, OnboardingGate } from './components/auth/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { OnboardingFlow } from './pages/auth/OnboardingFlow';

// Dashboard
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';

// Messaging and Calling
import { MessagesPage } from './pages/MessagesPage';
import { CallsPage } from './pages/CallsPage';

// Number Management and Settings
import { NumbersPage } from './pages/NumbersPage';
import { SettingsPage } from './pages/SettingsPage';

// Analytics
import { AnalyticsPage } from './pages/AnalyticsPage';

// Import CSS
import './index.css';
import './styles/dashboard.css';
import './styles/messaging.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            } />
            
            <Route path="/signup" element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            } />

            {/* Onboarding Route */}
            <Route path="/onboarding" element={
              <OnboardingGate>
                <OnboardingFlow />
              </OnboardingGate>
            } />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardOverview />} />
              <Route path="overview" element={<DashboardOverview />} />
              <Route path="calls" element={<CallsPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="numbers" element={<NumbersPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="contacts" element={<div className="p-6">Contacts Page - Coming Soon</div>} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-energy-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Page not found</p>
                  <a 
                    href="/" 
                    className="inline-flex items-center px-6 py-3 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
