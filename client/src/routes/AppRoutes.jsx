import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import PrivacyPage from "../pages/Privacy/PrivacyPage";
import TermsPage from "../pages/Terms/TermsPage";
import ProfilePage from "../pages/profile/ProfilePage";

// Donor Pages
import DonorOverview from "../pages/donor/DonorOverview";
import MyDonations from "../pages/donor/MyDonations";
import DonorRequests from "../pages/donor/DonorRequests";

// Receiver Pages
import ReceiverDashboard from "../pages/receiver/ReceiverDashboard";
import Marketplace from "../pages/receiver/Marketplace";
import MyRequests from "../pages/receiver/MyRequests";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ========================= */}
      {/* Public Routes */}
      {/* ========================= */}

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* ========================= */}
      {/* Donor Routes */}
      {/* ========================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DonorOverview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-donations"
        element={
          <ProtectedRoute>
            <MyDonations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donation-requests"
        element={
          <ProtectedRoute>
            <DonorRequests />
          </ProtectedRoute>
        }
      />
      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>

      {/* ========================= */}
      {/* Receiver Routes */}
      {/* ========================= */}

      <Route
        path="/receiver-dashboard"
        element={
          <ProtectedRoute>
            <ReceiverDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-requests"
        element={
          <ProtectedRoute>
            <MyRequests />
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Redirect */}
      {/* ========================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}