import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  VStack,
  useDisclosure,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react'
import iconProducts from '../../assets/icons/proudctsOrange.svg';
import { Heading, Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import ButtonBilo from '@/components/Button/ButtonBilo';
import { CustomRadioGroup } from '@/components/CustomRadioGroup/CustomRadioGroup';
import { CustomToggleButton } from '@/components/CustomToggleButton/CustomToggleButton';
import { getProduct } from '@/services/product.service';
import type { ProductType } from './products.schema';
import UseProductController from './product.controller';

export const EditProduct = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading: isLoadingProduct } = useQuery<ProductType>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
    refetchOnWindowFocus: false,
  })

  const { register, control, handleSubmit, onSubmit, errors, isSubmitting } = UseProductController(product)
    

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

  const options = [
    { value: 'true', label: 'Elaborado' },
    { value: 'false', label: 'Revendido' },
  ];

  useEffect(() => {
    if (isLoadingProduct) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoadingProduct, onOpen, onClose]);

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
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loadingModal}
      <HStack w="full" alignItems="center">
        <Image src={iconProducts} alt="iconProducts" boxSize="35px" />
        <Heading as="h1" size="xl">
           Modificar Producto
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

          <GridItem>
            <FormControl isInvalid={!!errors.codigo_barra}>
              <FormLabel {...labelStyle}>
                Código de Barra <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Input placeholder="Ingresá un Código de Barra" {...register('codigo_barra')} {...inputStyle} isDisabled={isSubmitting} />
              <FormErrorMessage {...mssgErrorStyle}>{errors.codigo_barra?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.nombre}>
              <FormLabel {...labelStyle}>
                Nombre <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Input placeholder="Ingresá un Nombre" {...register('nombre')}{...inputStyle} isDisabled={isSubmitting} />
              <FormErrorMessage {...mssgErrorStyle}>{errors.nombre?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.descripcion}>
              <FormLabel {...labelStyle}>
                Descripción <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Input placeholder="Ingresá una Descripción" {...register('descripcion')}{...inputStyle} isDisabled={isSubmitting} />
              <FormErrorMessage {...mssgErrorStyle}>{errors.descripcion?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.produccionPropia}>
              <FormLabel {...labelStyle}>Tipo de Producto <span style={{ color: 'red' }}>*</span></FormLabel>
              <Controller
                name="produccionPropia"
                control={control}
                render={({ field }) => (
                  <CustomRadioGroup
                    name={field.name}
                    value={field.value?.toString() ?? ''}
                    onChange={(value) => field.onChange(value === 'true')}
                    options={options}
                  />
                )}
              />
              <FormErrorMessage {...mssgErrorStyle}>{errors.produccionPropia?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
      <FormControl isInvalid={!!errors.pesable}>
        <FormLabel {...labelStyle}>Forma de Comercialización </FormLabel>
        <Box display="flex" alignItems="center" gap="1rem">
        <Controller
          name="pesable"
          control={control}
          render={({ field }) => (
            <CustomToggleButton
              label="Pesable"
              fontSize="xl"
              fitContent={true}
              height="4rem"
              width="8rem"
              isChecked={field.value}      
              onToggle={() => field.onChange(!field.value)}  
            />
          )}
        />
        </Box>
        <FormErrorMessage {...mssgErrorStyle}>{errors.pesable?.message}</FormErrorMessage>
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
