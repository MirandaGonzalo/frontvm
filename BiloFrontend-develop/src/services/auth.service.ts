import type { LoginUser } from '../interfaces/auth';
import { api } from '../config/axiosConfig';

export const logIn = async (user: LoginUser) => {
  const response = await api.post('/auth/login', user);
  return response.data;
};

export const logOut = async () => {
    const response = await api.post('/auth/logout');
    return response;
};

export const isAuthenticated = async () => {
  try {
    const res = await api.get('/auth/me');
    if(res.status === 200){
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
