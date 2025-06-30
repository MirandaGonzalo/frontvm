import { api } from '../config/axiosConfig';
import type { ClientType } from '@/pages/Clients/client.schema';

export const getClients = async (): Promise<ClientType[]> => {
  const response = await api.get('/cliente');
  return response.data;
};

export const getClient = async (id : string): Promise<ClientType> => {
  const response = await api.get(`/cliente/${id}`);
  return response.data;
};

export const updateClientState = async (id : string): Promise<void> => {
  const response = await api.put(`/cliente/eliminar/${id}`);
  return response.data;
};

export const createClient = async (client : ClientType): Promise<void> => {
  const response = await api.post('/cliente', client);
  return response.data;
};

export const updateClient = async (client : ClientType): Promise<void> => {
  const response = await api.put(`/cliente/${client.id}`, client);
  return response.data;
};

