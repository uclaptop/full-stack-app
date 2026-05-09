import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the user is authenticated by pinging the backend
    // The backend will check the HTTP-only cookie
    fetch('/api/auth/verify', { credentials: 'include' })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Clean up user info if the token is invalid
          localStorage.removeItem('uc_admin_user');
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/uclaptop" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
