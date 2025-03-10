import React from 'react';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: React.ReactNode;
}

export function ProtectedRoute({
  isAuthenticated,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) {
  if (isAuthenticated) {
    return <>{outlet}</>;
  } else {
    // Redirect to the login page
    window.location.href = authenticationPath;
    return null;
  }
}