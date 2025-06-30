import { api } from '../config/axiosConfig';

export const getProvinces = async () => {

  const response = await api.get('/provincia');
  return response.data;
};

export const getLocalidades = async (provincia_id : string) => {
    const response = await api.get(`/localidad/${provincia_id}`);
    return response.data;
};