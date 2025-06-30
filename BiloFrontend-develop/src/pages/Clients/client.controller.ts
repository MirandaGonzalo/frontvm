import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import type { ClientType } from './client.schema';
import { clientSchema } from './client.schema';
import { useMutation } from '@tanstack/react-query';
import { createClient, updateClient } from '@/services/client.service';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const UseClientController = (client?: ClientType) => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientType>({
    resolver: zodResolver(clientSchema),
    defaultValues: {

      telefono: '', 
      cuit: '',
      idTipoDocumento: '',
      idCondicionIva: '',
      direccion: {
        idLocalidad: '',
        idProvincia: '',
      }
    }
  });

  const createClientMutation = useMutation({
    mutationFn: (client: ClientType) =>
      createClient(client),
    onSuccess: () => {
      toast.success('Cliente Creado correctamente.', {
              position: 'top-center',
            });
      navigate('/clientes');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Error al crear Cliente.', {
        position: 'top-center',
      });
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: (client: ClientType) =>
      updateClient(client),
    onSuccess: () => {
      toast.success('Cliente Modificado correctamente.', {
              position: 'top-center',
            });
      navigate('/clientes');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Error al modificar Cliente.', {
        position: 'top-center',
      });
    },
  });

  // Actualizar el formulario cuando cambia el cliente
  useEffect(() => {
    if (client) {
      reset({
        codigo: client.codigo,
        idTipoDocumento: String(client.idTipoDocumento),
        dni: client.dni,
        cuit: client.cuit,
        idCondicionIva: String(client.idCondicionIva),
        nombre: client.nombre,
        apellido: client.apellido,
        telefono: client.telefono,
        email: client.email,
        direccion: {
          idProvincia: String(client.direccion.idProvincia),
          idLocalidad: String(client.direccion.idLocalidad),
          calle: client.direccion.calle,
          numeroCalle: client.direccion.numeroCalle,
          piso: client.direccion.piso,
          departamento: client.direccion.departamento,
          barrio: client.direccion.barrio
        }
      });
    }
  }, [client, reset]);

  const onSubmit = (clientValues: ClientType) => {
    if (client) {
      
      const updatedValues = {
        ...clientValues,
        id: client.id,
      };

      updateClientMutation.mutate(updatedValues);
    } else {
      createClientMutation.mutate(clientValues);
    }
  };

  const isSubmitting = createClientMutation.isPending || updateClientMutation.isPending;

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

export default UseClientController;