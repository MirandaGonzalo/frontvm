import { useAuthStore } from '@/store/auth.store';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated as checkAuthFromServer } from "@/services/auth.service";

const PublicRoute = () => {
  const { setIsAuthenticated, setLoading } = useAuthStore();
  const [validSession, setValidSession] = useState(false);

    useEffect(() => {
      const verifySession = async () => {
        setLoading(true);
        try {
          const valid = await checkAuthFromServer();
          setIsAuthenticated(valid);
          setValidSession(valid);
        } catch {
          setIsAuthenticated(false);
          setValidSession(false);
        } finally {
          setLoading(false);
        }
      };
  
      verifySession();
    }, [setIsAuthenticated]);
  
  // Redirigir a la página principal si el usuario está autenticado
  if (validSession) {
    return <Navigate to="/" replace />;
  }

  // Renderizar el contenido si el usuario no está autenticado
  return <Outlet />;
};

export default PublicRoute;
