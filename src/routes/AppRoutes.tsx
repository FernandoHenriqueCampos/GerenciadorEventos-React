import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home'; 
import { useAuth } from '../context/AuthContext';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  const { loading } = useAuth();

  if (loading) return null; 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}