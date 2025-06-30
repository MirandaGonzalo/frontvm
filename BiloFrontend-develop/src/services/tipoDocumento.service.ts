import { api } from '../config/axiosConfig';
import type { TipoDocumento } from '@/interfaces/support';

export const getTiposDocumento = async (): Promise<TipoDocumento[]> => {
  const response = await api.get('/tipo-documento');
  return response.data;
};