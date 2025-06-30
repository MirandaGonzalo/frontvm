import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { isAuthenticated as checkAuthFromServer } from "@/services/auth.service";
import { Spinner, Box, Center } from "@chakra-ui/react";

const PrivateRoute = () => {
  const { setIsAuthenticated, expirationTime, setLoading, loading } = useAuthStore();
  const timeoutId = useRef<number | null>(null);
  const [validSession, setValidSession] = useState<boolean>(false);
  const [initialized, setInitialized] = useState(false); 

  // Verificar sesión al montar el componente
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
        setInitialized(true);
      }
    };

    verifySession();
  }, [setIsAuthenticated]);

  // Verificar expiración de sesión
  useEffect(() => {
    if (expirationTime && expirationTime < Date.now()) {
      setIsAuthenticated(false);
      setValidSession(false);
      return;
    }

    if (expirationTime && expirationTime > Date.now()) {
      const msUntilExpire = expirationTime - Date.now();
      timeoutId.current = setTimeout(() => {
        setIsAuthenticated(false);
        setValidSession(false);
      }, msUntilExpire);
    }

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [expirationTime, setIsAuthenticated]);

  // Mostrar loading si está cargando o aún no terminó la primera verificación
  if (loading || !initialized) {
    return (
      <Box pos="absolute" inset="0" bg="bg/80">
        <Center h="full">
          <Spinner color="blue.500" size="2xl" />
        </Center>
      </Box>
    );
  }

  // Si no hay sesión válida, redirigir
  return validSession ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
