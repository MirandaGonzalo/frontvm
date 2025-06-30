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
import iconProducts from '../../assets/icons/proudctsOrange.svg';
import { useNavigate } from 'react-router-dom';
import type { ProductType } from './products.schema';
import StateBadge from '@/components/TableBilo/StateBadge';
import printIcon from '@/assets/icons/printer.svg';
import plusIcon from '@/assets/icons/circle-plus.svg';
import BooleanBadge from '@/components/TableBilo/BooleanBadge';
import { showPrintToast } from '@/utils/printToast';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getProducts, updateProductState } from '@/services/product.service';

export const ListProduct = () => {
  const CancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const queryClient = useQueryClient();

  const { data: products } = useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const updateProductStateMutation = useMutation({
    mutationFn: updateProductState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
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

  const colors = {
    gray: '#808080',      
    darkGray: '#44556f',  
  };
   
  const navigate = useNavigate();

  const handleEdit = (row: Row<ProductType>) => {
    navigate(`/productos/editar/${row.original.id}`);
  };

  const handleDelete = (row: Row<ProductType>) => {
    setSelectedProduct(row.original);
    onOpen();
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      updateProductStateMutation.mutate(String(selectedProduct.id));
    }
    onClose();
  };

  const editableColumns: ColumnDef<ProductType>[] = [
    {
      id: 'codigo',
      header: 'Código',
      accessorKey: 'codigo',
    },
    {
      id: 'nombre',
      header: 'Nombre',
      accessorKey: 'nombre',
    },
    {
      id: 'descripcion',
      header: 'Descripción',
      accessorKey: 'descripcion',
    },
    {
      id: 'produccionPropia',
      header: 'Elaboración Propia / Reventa',
      accessorKey: 'produccionPropia',
      cell: (info) => {
        const value = info.getValue() as boolean;
        return <BooleanBadge value={value} trueLabel="Elaborado" falseLabel="Reventa" trueColor={colors.gray} falseColor={colors.darkGray} />;
      },
    },
    {
      id: 'estado_articulo',
      header: 'Estado',
      accessorKey: 'estado_articulo',
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
        Math.random() > 0.3 ? resolve('Impresión completada') : reject('Error al imprimir');
      }, 3000);
    });
  };
  
  return (
    <VStack gap={4} justifyContent="flex-start">
      <HStack w="full" justifyContent="space-between" alignItems="center">
        <HStack>
          <Image src={iconProducts} alt="iconProducts" boxSize="35px" />
          <Heading as="h1" size="xl">
            Productos
          </Heading>
        </HStack>
        <HStack gap={4}>
          <ButtonBilo
            colorScheme="blue"
            alignSelf="flex-end"
            title="Imprimir Listado"
            leftIconSrc={printIcon}
            onClick={() =>
              showPrintToast(imprimirDocumento)
            }
          />
          <ButtonBilo
            colorScheme="lightBlue"
            alignSelf="flex-end"
            title="Nuevo Producto"
            leftIconSrc={plusIcon}
            onClick={() => navigate('/productos/registrar')}
          />
        </HStack>
      </HStack>

      <TableBilo
        columns={editableColumns}
        data={products ?? []}
        detailPath="/productos/detalleProducto"
        showActionBar
        showActionColumn
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterSwitches={[
          {
            id: "activos",
            label: "Activo",
            text: "Ver",
            field: "estado_articulo",
            value: "Activo",
            pluralLabel: true,
            color: "green"
          },
          {
            id: "elaborados",
            label: "Elaborado",
            text: "Ver Productos",
            field: "produccionPropia",
            value: true,
            pluralLabel: true,
            color: 'blue.400'
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
              ¿Quiere cambiar el estado del Producto
              <br />
              <strong>
                {selectedProduct?.nombre}
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

