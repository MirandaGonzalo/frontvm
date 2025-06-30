import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Input,
  VStack,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import SelectBilo from '@/components/Select/SelectBilo';
import iconClients from '../../assets/icons/clientOrange.svg';
import { withMask } from 'use-mask-input';
import ButtonBilo from '@/components/Button/ButtonBilo';

import { getProvinces, getLocalidades } from '@/services/address.service';
import { getTiposDocumento } from '@/services/tipoDocumento.service';
import { getCondicionesIVA } from '@/services/condicionIVA.service';
import { getClient } from '@/services/client.service';

import { useQuery } from '@tanstack/react-query';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import UseClientController from './client.controller';

import { Controller } from 'react-hook-form';

import type { Location, TipoDocumento, CondicionIVA } from '@/interfaces/support';

import type { ClientType } from './client.schema';



export const EditClient = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const { data: client, isLoading: isLoadingClient } = useQuery<ClientType>({
    queryKey: ['client', id],
    queryFn: () => getClient(id as string),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const { register, control, handleSubmit, onSubmit, errors, isSubmitting } = UseClientController(client)
  
  const inputStyle = {
    h: '3rem',
    w: '80%',
  };

  const labelStyle = {
    fontSize: '2xl',
    fontWeight: '600',
  };

  const mssgErrorStyle = {
    fontSize: 'xl',
  };

  type Option = {
  value: string;
  label: string;
  };



  const { data:  condiciones} = useQuery<CondicionIVA[], Error, Option[]>({
    queryKey: ['condicionesIVA'],
    queryFn: getCondicionesIVA,
    select: (data : CondicionIVA[]) : Option[] => 
      data.map((tipo: CondicionIVA) => ({
        label: tipo.nombre,
        value: String(tipo.id),
      })).sort((a, b) => a.label.localeCompare(b.label)),
  });

  const { data:  tiposDocumento} = useQuery<TipoDocumento[], Error, Option[]>({
    queryKey: ['tiposDocumento'],
    queryFn: getTiposDocumento,
    select: (data: TipoDocumento[]) : Option[] => 
      data.map((tipo: TipoDocumento) => ({
        label: tipo.nombre,
        value: String(tipo.id),
      })).sort((a, b) => a.label.localeCompare(b.label)),
  });

  const { data: provinces } = useQuery<Location[], Error, Option[]>({
    queryKey: ['provinces'],
    queryFn: getProvinces,
    select: (data : Location[]) : Option[] => 
      data.map((provincia : Location) => ({
        label: provincia.nombre,
        value: String(provincia.id),
      })).sort((a, b) => a.label.localeCompare(b.label)),
  });

  const { data: localidades } = useQuery<Location[], Error, Option[]>({
    queryKey: ['localidades', provinciaSeleccionada],
    queryFn: () => getLocalidades(provinciaSeleccionada!),
    enabled: !!provinciaSeleccionada,
    select: (data : Location[]): Option[] =>
      data.map((localidad : Location) => ({
        label: localidad.nombre,
        value: String(localidad.id),
      })).sort((a, b) => a.label.localeCompare(b.label)),
  });

  useEffect(() => {
    if (client?.direccion?.idProvincia) {
      setProvinciaSeleccionada(String(client.direccion.idProvincia));
    }
  }, [client]);
  
  useEffect(() => {
    if (isLoadingClient) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoadingClient, onOpen, onClose]);


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
    <VStack 
      gap="2rem"
      as='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      {loadingModal}
      <HStack w="full" alignItems="center">
        <Image src={iconClients} alt="iconClients" boxSize="35px" />
        <Heading as="h1" size="xl">
          Modificar Cliente
        </Heading>
      </HStack>
      <Box
        w="full"
        h="full"
        border="1px solid #E2E8F0"
        borderRadius="lg"
        p="2rem"
      >
        <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
          <GridItem>
            <FormControl isInvalid={!!errors.codigo}>
              <FormLabel {...labelStyle}>
                Código <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Input placeholder="Ingresá un Código" {...register('codigo')} {...inputStyle} isDisabled={isSubmitting}/>
              <FormErrorMessage {...mssgErrorStyle}>{errors.codigo?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem />

          <GridItem>
            <FormControl isInvalid={!!errors.idTipoDocumento}>
              <FormLabel {...labelStyle}>
                Tipo de Documento <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Box {...inputStyle}>
                <Controller
                  name="idTipoDocumento"
                  control={control}
                  render={({ field }) => (
                    <SelectBilo
                      error={!!errors.idTipoDocumento}
                      errorMessage={errors.idTipoDocumento?.message}
                      placeholder="Seleccioná un Tipo de Documento"
                      {...field}
                      options={tiposDocumento ?? []}
                      value={tiposDocumento?.find(option => option.value === field.value) || null}
                      onChange={(option) => field.onChange(option?.value ?? "")}
                      onBlur={field.onBlur}
                      isDisabled={isSubmitting}
                    />
                  )}
                />
              </Box>
              <FormErrorMessage mt='1.5rem' {...mssgErrorStyle}>{errors.idTipoDocumento?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.dni}>
              <FormLabel {...labelStyle}>
                Número de Documento <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Input
                placeholder="Ingresá un Número de Documento"
                {...register('dni')}
                {...inputStyle}
                isDisabled={isSubmitting}
              />
              <FormErrorMessage {...mssgErrorStyle}>{errors.dni?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.cuit}>
              <FormLabel {...labelStyle}>
                CUIL / CUIT <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Controller
                name="cuit"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ingresá un CUIL / CUIT"
                    {...inputStyle}
                    ref={withMask('99-99999999-9')}
                    isDisabled={isSubmitting}
                  />
                )}
              />
              <FormErrorMessage {...mssgErrorStyle}>{errors.cuit?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.idCondicionIva}>
              <FormLabel {...labelStyle}>
                Condición de IVA <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Box {...inputStyle}>
                <Controller
                  name="idCondicionIva"
                  control={control}
                  render={({ field }) => (
                    <SelectBilo
                      error={!!errors.idCondicionIva}
                      errorMessage={errors.idCondicionIva?.message}
                      placeholder="Seleccioná una Condición de IVA"
                      {...field}
                      options={condiciones ?? []}
                      value={condiciones?.find(option => option.value === field.value) || null}
                      onChange={(option) => field.onChange(option?.value ?? "")}
                      onBlur={field.onBlur}
                      isDisabled={isSubmitting}
                    />
                  )}
                />
              </Box>
              <FormErrorMessage mt='1.5rem' {...mssgErrorStyle}>{errors.idCondicionIva?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.nombre}>
              <FormLabel {...labelStyle}>
                Nombre <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Input
                placeholder="Ingresá un Nombre - Razón Social"
                {...register('nombre')}
                {...inputStyle}
                isDisabled={isSubmitting}
              />
              <FormErrorMessage {...mssgErrorStyle}>{errors.nombre?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.apellido}>
              <FormLabel {...labelStyle}>
                Apellido <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Input placeholder="Ingresá un Apellido" {...register('apellido')} {...inputStyle} isDisabled={isSubmitting} />
              <FormErrorMessage {...mssgErrorStyle}>{errors.apellido?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.telefono}>
              <FormLabel {...labelStyle}>
                Teléfono <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                    <Input
                      {...field}
                      ref={withMask('(999) 9999999')}
                      placeholder="Ingresá un Teléfono (999) 9999999"
                      {...inputStyle}
                      isDisabled={isSubmitting}
                    />
              )}
              />
              <FormErrorMessage {...mssgErrorStyle}>{errors.telefono?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel {...labelStyle}>
                Email <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Input placeholder="Ingresá un Email" {...register('email')} {...inputStyle} isDisabled={isSubmitting}/>
              <FormErrorMessage {...mssgErrorStyle}>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.direccion?.idProvincia}>
              <FormLabel {...labelStyle}>
                Provincia <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Box {...inputStyle}>
                <Controller
                  name='direccion.idProvincia'
                  control={control}
                  rules={{ required: 'La provincia es obligatoria' }}
                  render={({ field }) => (
                    <SelectBilo
                      error={!!errors.direccion?.idProvincia}
                      errorMessage={errors.direccion?.idProvincia?.message}
                      options={provinces ?? []}
                      placeholder="Seleccioná una Provincia"
                      {...field}
                      value={provinces?.find(option => option.value === field.value) || null}
                      onChange={(option) => {
                        field.onChange(option?.value ?? "");
                        setProvinciaSeleccionada(String(option?.value));
                      }}
                      onBlur={field.onBlur}
                      isDisabled={isSubmitting}
                    />
                  )}
                />
              </Box>
              <FormErrorMessage mt='1.5rem' {...mssgErrorStyle}>{errors.direccion?.idProvincia?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.direccion?.idLocalidad}>
              <FormLabel {...labelStyle}>
                Localidad <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Box {...inputStyle}>
                <Controller
                  name='direccion.idLocalidad'
                  control={control}
                  rules={{ required: 'La Localidad es obligatoria' }}
                  render={({ field }) => (
                    <SelectBilo 
                      key={provinciaSeleccionada}
                      error={!!errors.direccion?.idLocalidad}
                      errorMessage={errors.direccion?.idLocalidad?.message}
                      placeholder="Seleccioná una Localidad" 
                      options={localidades ?? []}
                      value={localidades?.find(option => option.value === field.value) || null}
                      onChange={(option) => field.onChange(option?.value ?? "")}
                      onBlur={field.onBlur}
                      isDisabled={isSubmitting}
                    />
                  )}
                />
              </Box>
              <FormErrorMessage mt='1.5rem' {...mssgErrorStyle}>{errors.direccion?.idLocalidad?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem pt='1rem'>
            <FormControl isInvalid={!!errors.direccion?.calle}>
              <FormLabel {...labelStyle}>
                Calle <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Input placeholder="Ingresá una Calle" {...register('direccion.calle')} {...inputStyle} isDisabled={isSubmitting}/>
              <FormErrorMessage {...mssgErrorStyle}>{errors.direccion?.calle?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <HStack gap="4rem" w='80%' pt='1rem' alignItems="flex-start">
            <FormControl isInvalid={!!errors.direccion?.numeroCalle}>
              <FormLabel {...labelStyle}>
                Número <span style={{ color: 'red'}}>*</span>
              </FormLabel>
              <Input placeholder="Ingresá un Número" {...register('direccion.numeroCalle')} isDisabled={isSubmitting}/>
              <FormErrorMessage {...mssgErrorStyle}>{errors.direccion?.numeroCalle?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.direccion?.piso}>
              <FormLabel {...labelStyle}>
                Piso
              </FormLabel>
              <Input placeholder="Ingresá un Piso" {...register('direccion.piso')} isDisabled={isSubmitting}/>
              <FormErrorMessage {...mssgErrorStyle}>{errors.direccion?.piso?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.direccion?.departamento}>
              <FormLabel {...labelStyle}>
                Dpto
              </FormLabel>
              <Input placeholder="Ingresá un Dpto" {...register('direccion.departamento')} isDisabled={isSubmitting}/>
              <FormErrorMessage {...mssgErrorStyle}>{errors.direccion?.departamento?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <GridItem>
            <FormControl isInvalid={!!errors.direccion?.barrio}>
              <FormLabel {...labelStyle}>
                Barrio
              </FormLabel>
              <Input placeholder="Ingresá un Barrio" {...register('direccion.barrio')} {...inputStyle} isDisabled={isSubmitting}/>
              <FormErrorMessage {...mssgErrorStyle}>{errors.direccion?.barrio?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

        </Grid>
      </Box>

      <ButtonBilo
        type="submit"
        colorScheme="orange"
        alignSelf="flex-end"
        title={isSubmitting ? 'Guardando...' : 'Guardar'}
        fontSize="2xl"
        isLoading={isSubmitting}
      />
    </VStack>
  );
};

