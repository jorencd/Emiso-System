import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import BookPage from "../pages/BookPage";
import JournalPage from "../pages/JournalPage";

const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public route (LoginPage) */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/hero"
          element={
            <ProtectedRoute>
              <BookPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <JournalPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown paths to the login page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;