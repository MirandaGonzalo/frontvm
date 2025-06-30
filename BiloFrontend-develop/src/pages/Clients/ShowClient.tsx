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
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import iconClients from '../../assets/icons/clientOrange.svg';
import { useParams } from 'react-router-dom';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getClient } from '@/services/client.service';
import type { ClientType } from './client.schema';
import {  formatDni, formatTelefono } from '@/utils/formatters';

export const ShowClient = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: client, isLoading, isFetching } = useQuery<ClientType>({
    queryKey: ['client', id],
    queryFn: () => getClient(id as string),
    enabled: !!id
  });
  
  React.useEffect(() => {
    if (isLoading || isFetching) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoading, isFetching, onOpen, onClose]);
  
  if (!client && !isLoading) {
    return (
      <VStack gap="2rem" justifyContent="center" alignItems="center" h="80vh">
        <Heading>No se encontraron datos del cliente</Heading>
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
        <Image src={iconClients} alt="iconClients" boxSize="35px" />
        <Heading as="h1" size="xl">
          Detalle de Cliente
        </Heading>
      </HStack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="2rem">
        <Card border="1px solid #E2E8F0" borderRadius="2xl">
          <CardHeader bg="dark.500" color="white" borderTopRadius="2xl">
            <Heading {...subtitleStyle}>Datos de Identificación</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Código</Heading>
                  <Text {...textStyle}>{client?.codigo}</Text>
                </Stack>
              </GridItem>

              <GridItem />

              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Nombre</Heading>
                  <Text {...textStyle}>{client?.nombre}</Text>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Apellido</Heading>
                  <Text {...textStyle}>{client?.apellido}</Text>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Tipo de Documento</Heading>
                  <Text {...textStyle}>{client?.tipoDocumento}</Text>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Número de Documento</Heading>
                  <Text {...textStyle}>{formatDni(client?.dni)}</Text>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>CUIL/CUIT</Heading>
                  <Text {...textStyle}>{client?.cuit}</Text>
                </Stack>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        <Card border="1px solid #E2E8F0" borderRadius="2xl">
          <CardHeader  bg="dark.500" color="white" borderTopRadius="2xl">
            <Heading {...subtitleStyle}>Contacto y Dirección</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
              <GridItem>
                  <Stack spacing="2">
                    <Heading {...labelStyle}>Teléfono</Heading>
                    <Text {...textStyle}>{formatTelefono(client?.telefono)}</Text>
                  </Stack>
              </GridItem>

              <GridItem>
                  <Stack spacing="2">
                    <Heading {...labelStyle}>Email</Heading>
                    <Text {...textStyle}>{client?.email}</Text>
                  </Stack>
              </GridItem>

              <GridItem>
                  <Stack spacing="2">
                    <Heading {...labelStyle}>Provincia</Heading>
                    <Text {...textStyle}>{client?.direccion.provincia}</Text>
                  </Stack>
              </GridItem>

              <GridItem>
                  <Stack spacing="2">
                    <Heading {...labelStyle}>Localidad</Heading>
                    <Text {...textStyle}>{client?.direccion.localidad}</Text>
                  </Stack>
              </GridItem>

              <GridItem>
                <Stack spacing="2">
                  <Heading {...labelStyle}>Dirección</Heading>
                  <Text {...textStyle}>
                      {client?.direccion.calle} {client?.direccion.numeroCalle} - {client?.direccion.piso} {client?.direccion.departamento}
                  </Text>
                </Stack>
              </GridItem>

              <GridItem>
                  <Stack spacing="2">
                    <Heading {...labelStyle}>Barrio</Heading>
                    <Text {...textStyle}>{client?.direccion.barrio}</Text>
                  </Stack>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </Grid>

      <Card border="1px solid #E2E8F0" borderRadius="2xl">
        <CardHeader  bg="dark.500" color="white" borderTopRadius="2xl">
          <Heading {...subtitleStyle}>Datos Fiscales</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
            <GridItem>
              <Stack spacing="2">
                <Heading {...labelStyle}>Condición de IVA</Heading>
                <Text {...textStyle}>{client?.condicionIva}</Text>
              </Stack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>

    </VStack>
  );
};


