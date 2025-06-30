import {
  Heading,
  VStack,
  HStack,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import type { ColumnDef, Row } from '@tanstack/react-table';
import { TableBilo } from '@/components/TableBilo/TableBilo';
import ButtonBilo from '@/components/Button/ButtonBilo';
import iconClients from '../../assets/icons/clientOrange.svg';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClients, updateClientState } from '@/services/client.service';
import type { ClientType } from './client.schema';
import { formatDni, formatTelefono } from '@/utils/formatters';
import StateBadge from '@/components/TableBilo/StateBadge';
import printIcon from '@/assets/icons/printer.svg';
import plusIcon from '@/assets/icons/circle-plus.svg';
import { toast } from 'react-toastify';
import { showPrintToast } from '@/utils/printToast';

export const ListClient = () => {
  const CancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const queryClient = useQueryClient();

  const { data: clients } = useQuery<ClientType[]>({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  const updateClientStateMutation = useMutation({
    mutationFn: updateClientState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Estado Actualizado', {
        position: 'top-center',
      });
    },
    onError: () => {
      toast.error('Error al actualizar el estado', {
        position: 'top-center',
      });
    },
  });

  const navigate = useNavigate();

  const handleEdit = (row: Row<ClientType>) => {
    navigate(`/clientes/editar/${row.original.id}`);
  };

  const handleDelete = (row: Row<ClientType>) => {
    setSelectedClient(row.original);
    onOpen();
  };

  const confirmDelete = () => {
    if (selectedClient) {
      updateClientStateMutation.mutate(String(selectedClient.id));
    }
    onClose();
  };

  const editableColumns: ColumnDef<ClientType>[] = [
    {
      id: 'codigo',
      header: 'Código',
      accessorKey: 'codigo',
    },
    {
      id: 'nombre-completo',
      header: 'Nombre Completo',
      accessorFn: (row) => `${row.nombre} ${row.apellido}`,
    },
    {
      id: 'tipoDocumento',
      header: 'Tipo Documento',
      accessorKey: 'tipoDocumento',
    },
    {
      id: 'dni',
      header: 'Nro. Documento',
      accessorKey: 'dni',
      cell: (info) => formatDni(info.getValue() as string),
    },
    {
      id: 'telefono',
      header: 'Teléfono',
      accessorKey: 'telefono',
      cell: (info) => formatTelefono(info.getValue() as string),
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'estado',
      header: 'Estado',
      accessorKey: 'estado_cliente',
      cell: (info) => {
        const estado = info.getValue() as string;

        const colorMap: Record<string, string> = {
          Activo: '#228B22',
          Inactivo: '#CA0B0B',
        };

        const color = colorMap[estado] || 'black';

        return <StateBadge state={estado} color={color} />;
      },
    },
  ];

  const imprimirDocumento = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simula éxito o fallo aleatorio
        Math.random() > 0.3
          ? resolve('Impresión completada')
          : reject('Error al imprimir');
      }, 3000);
    });
  };

  return (
    <VStack gap={4} justifyContent="flex-start">
      <HStack w="full" justifyContent="space-between" alignItems="center">
        <HStack>
          <Image src={iconClients} alt="iconClients" boxSize="35px" />
          <Heading as="h1" size="xl">
            Clientes
          </Heading>
        </HStack>
        <HStack gap={4}>
          <ButtonBilo
            colorScheme="blue"
            alignSelf="flex-end"
            title="Imprimir Listado"
            leftIconSrc={printIcon}
            onClick={() => showPrintToast(imprimirDocumento)}
          />
          <ButtonBilo
            colorScheme="lightBlue"
            alignSelf="flex-end"
            title="Nuevo Cliente"
            leftIconSrc={plusIcon}
            onClick={() => navigate('/clientes/registrar')}
          />
        </HStack>
      </HStack>

      <TableBilo
        columns={editableColumns}
        data={clients ?? []}
        detailPath="/clientes/detalleCliente"
        showActionBar
        showActionColumn
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterSwitches={[
          {
            id: "activos",
            label: "Activo",
            text: "Ver",
            field: "estado_cliente",
            value: "Activo",
            pluralLabel: true,
            color: "green"
          }
        ]}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={CancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay p="2rem">
          <AlertDialogContent p="2rem" minWidth="500px" borderRadius="2xl">
            <AlertDialogHeader fontSize="1.8rem" fontWeight="bold">
              Cambiar Estado
            </AlertDialogHeader>

            <AlertDialogBody fontSize="2xl">
              ¿Quiere cambiar el estado del cliente{' '}
              <strong>
                {selectedClient?.nombre} {selectedClient?.apellido}
              </strong>
              ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <ButtonBilo
                colorScheme="white"
                title="Cancelar"
                onClick={onClose}
                color="black"
                border="1px solid black"
              />
              <ButtonBilo
                colorScheme="black"
                title="Confirmar"
                onClick={confirmDelete}
                ml={3}
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};
