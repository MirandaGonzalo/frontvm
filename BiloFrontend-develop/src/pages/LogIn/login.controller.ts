import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './login.schema';
import type { LoginType } from './login.schema';
import { useNavigate } from 'react-router-dom';
import { logIn } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'react-toastify';

const UseLoginController = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });


  const loginMutation = useMutation({
    mutationFn: (user: LoginType) =>
      logIn({ nombre_usuario: user.username, contraseña: user.password }),
    onSuccess: () => {
      useAuthStore.setState({ isAuthenticated: true });
      navigate('/');
      reset();
    },
    onError: () => {
      toast.error('Verifique su usuario y contraseña e intente nuevamente');
    },
  });

  const onSubmit = (user: LoginType) => {
    loginMutation.mutate(user);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default UseLoginController;
