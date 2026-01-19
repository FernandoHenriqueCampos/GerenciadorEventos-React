import React from 'react'; 
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Carregando...
      </div>
    );
  }

  return signed ? <>{children}</> : <Navigate to="/login" />;
};