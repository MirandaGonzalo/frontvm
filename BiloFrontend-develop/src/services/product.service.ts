import { api } from '../config/axiosConfig';
import type { ProductType } from '@/pages/Products/products.schema';

export const getProducts = async (): Promise<ProductType[]> => {
  const response = await api.get('/articulo');
  return response.data;
};

export const getProduct = async (id : string): Promise<ProductType> => {
  const response = await api.get(`/articulo/${id}`);
  return response.data;
};

export const updateProductState = async (id : string): Promise<void> => {
  const response = await api.put(`/articulo/eliminar/${id}`);
  return response.data;
};

export const createProduct = async (product : ProductType): Promise<void> => {
  const response = await api.post('/articulo', product);
  return response.data;
};

export const updateProduct = async (product : ProductType): Promise<void> => {
  const response = await api.put(`/articulo/${product.id}`, product);
  return response.data;
};
