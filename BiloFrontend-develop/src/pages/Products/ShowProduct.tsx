import {
  Grid,
  GridItem,
  HStack,
  VStack,
  Heading,
  Image,
  Card,
  CardHeader,
  CardBody,
  Text,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Center,
} from '@chakra-ui/react';
import iconProducts from '../../assets/icons/proudctsOrange.svg';

import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import React from 'react';

import type { ProductType } from './products.schema';
import BooleanBadge from '@/components/TableBilo/BooleanBadge';
import StateBadge from '@/components/TableBilo/StateBadge';
import BooleanIcon from '@/components/TableBilo/BooleanIcon';

import { getProduct } from '@/services/product.service';

export const ShowProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const { data: product,  isLoading, isFetching} = useQuery<ProductType>({
  queryKey: ['product', id],
  queryFn: () => getProduct(id as string),
  enabled: !!id, 
  });
    
  React.useEffect(() => {
    if (isLoading || isFetching) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoading, isFetching, onOpen, onClose]);
    
  if (!product && !isLoading) {
    return (
      <VStack gap="2rem" justifyContent="center" alignItems="center" h="80vh">
        <Heading>No se encontraron datos del Producto</Heading>
      </VStack>
    );
  }

  const labelStyle = {
    fontSize: '2xl',
    fontWeight: '600',
  };

  const subtitleStyle = {
    fontSize: '2xl',
    fontWeight: '600',
  };

  const textStyle = {
    fontSize: '2xl',
    fontWeight: '300',
  };

  const colors = {
    gray: '#808080',      
    darkGray: '#1F2937',  
  };

  const loadingModal = (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
      <ModalOverlay bg="blackAlpha.400" />
      <ModalContent bg="transparent" boxShadow="none" display="flex" alignItems="center" justifyContent="center">
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        </Center>
      </ModalContent>
    </Modal>
  );

  return (
    <VStack gap="2rem" align="stretch">
      {loadingModal}
      <HStack w="full" alignItems="center">
        <Image src={iconProducts} alt="iconProducts" boxSize="35px" />
        <Heading as="h1" size="xl">
          Detalle de Producto
        </Heading>
      </HStack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="2rem">
        <Card border="1px solid #E2E8F0" borderRadius="2xl">
          <CardHeader bg="dark.500" color="white" borderTopRadius="2xl">
            <Heading {...subtitleStyle}>Información Básica</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(1, 1fr)" gap="1rem">
              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Código</Heading>
                  <Text {...textStyle}>{product?.codigo}</Text>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Código de Barra</Heading>
                  <Text {...textStyle}>{product?.codigo_barra}</Text>
                </Stack>
              </GridItem>

              <GridItem >
                <Stack spacing="2">
                  <Heading {...labelStyle}>Nombre</Heading>
                  <Text {...textStyle}>{product?.nombre}</Text>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Descripción</Heading>
                  <Text {...textStyle}>{product?.descripcion}</Text>
                </Stack>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        <Card border="1px solid #E2E8F0" borderRadius="2xl">
          <CardHeader bg="dark.500" color="white" borderTopRadius="2xl">
            <Heading {...subtitleStyle}>Características</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
              <GridItem>
                <Stack w='14rem'>
                  <Heading {...labelStyle}>Tipo de Producto</Heading>
                  <BooleanBadge value={product?.produccionPropia || false} trueLabel="Elaborado" falseLabel="Revendido" trueColor={colors.gray} falseColor={colors.darkGray} />
                </Stack>
              </GridItem>

              <GridItem>
                <Stack>
                  <Heading {...labelStyle}>Pesable</Heading>
                  <BooleanIcon value={product?.pesable || false} />
                </Stack>
              </GridItem>

              <GridItem>
                <Stack w='14rem'>
                  <Heading {...labelStyle}>Estado</Heading>
                 <StateBadge state={product?.estado_articulo || ''} color={product?.estado_articulo === 'Activo' ? 'green' : 'red'} />
                </Stack>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );
};
