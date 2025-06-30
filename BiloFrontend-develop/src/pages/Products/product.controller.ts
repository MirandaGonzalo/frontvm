import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import type { ProductType } from './products.schema';
import { productSchema } from './products.schema';
import { useMutation } from '@tanstack/react-query';
import { createProduct, updateProduct } from '@/services/product.service';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const UseProductController = (product?: ProductType) => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        produccionPropia: true,  
        pesable: false,
    }
  });

  const createProductMutation = useMutation({
    mutationFn: (product: ProductType) =>
      createProduct(product),
    onSuccess: () => {
      toast.success('Producto Creado correctamente.', {
              position: 'top-center',
            });
      navigate('/productos');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Error al crear Producto.', {
        position: 'top-center',
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (product: ProductType) =>
      updateProduct(product),
    onSuccess: () => {
      toast.success('Producto Modificado correctamente.', {
              position: 'top-center',
            });
      navigate('/productos');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Error al modificar Producto.', {
        position: 'top-center',
      });
    },
  });

  // Actualizar el formulario cuando cambia el producto
  useEffect(() => {
    if (product) {
      reset({
        codigo: product.codigo,
        codigo_barra: product.codigo_barra,
        nombre: product.nombre,
        descripcion: product.descripcion,
        produccionPropia: product.produccionPropia,
        pesable: product.pesable,

      });
    }
  }, [product, reset]);

  const onSubmit = (productValues: ProductType) => {
    if (product) {
      
      const updatedValues = {
        ...productValues,
        id: product.id,
      };

      updateProductMutation.mutate(updatedValues);
    } else {
        console.log(productValues)
      createProductMutation.mutate(productValues);
    }
  };

  const isSubmitting = createProductMutation.isPending || updateProductMutation.isPending;

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    reset,
  };
};

export default UseProductController;