import { api } from '../config/axiosConfig';
import type { CondicionIVA} from '@/interfaces/support';

export const getCondicionesIVA = async (): Promise<CondicionIVA[]> => {
  const response = await api.get('/condicion-iva');
  return response.data;
};