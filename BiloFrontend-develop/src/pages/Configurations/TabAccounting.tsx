import React from 'react'
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from '@chakra-ui/react';
import SelectBilo from '@/components/Select/SelectBilo';
import ButtonBilo from '@/components/Button/ButtonBilo';

const TabAccounting = () => {
  const inputStyle = {
    h: '3rem',
    w: '90%',
  };

  const labelStyle = {
    fontSize: 'xl',
    fontWeight: '600',
  };

  // Options for Condición de IVA dropdown
  const condicionIvaOptions = [
    { value: 'responsable_inscripto', label: 'Responsable Inscripto' },
    { value: 'monotributo', label: 'Monotributo' },
    { value: 'exento', label: 'Exento' },
    { value: 'consumidor_final', label: 'Consumidor Final' },
  ];

  return (
    <Box
      w="full"
      h="full"
      border="1px solid #E2E8F0"
      borderRadius="lg"
      p="2rem"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap="1.5rem">
        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Condición de IVA
            </FormLabel>
            <Box {...inputStyle}>
              <SelectBilo
                options={condicionIvaOptions}
                placeholder="Seleccioná una condición"
                error={false}
              />
            </Box>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Factura Electrónica
            </FormLabel>
            <Input
              placeholder="Ingresá información de factura electrónica"
              {...inputStyle}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Consola Inteligente
            </FormLabel>
            <Input
              placeholder="Ingresá número de consola"
              {...inputStyle}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Punto de Venta
            </FormLabel>
            <Input
              placeholder="Ingresá punto de venta"
              {...inputStyle}
              type="number"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Interés
            </FormLabel>
            <Input
              placeholder="Ingresá porcentaje de interés"
              {...inputStyle}
              type="number"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Tiempo
            </FormLabel>
            <Input
              placeholder="Ingresá tiempo"
              {...inputStyle}
              type="number"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Cuenta de Banco
            </FormLabel>
            <Input
              placeholder="Ingresá cuenta bancaria"
              {...inputStyle}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      <ButtonBilo
        colorScheme="orange"
        alignSelf="flex-end"
        title="Guardar"
        fontSize="lg"
        mt="4rem"
        float="right"
        onClick={() => console.log('Guardar')}
      />
    </Box>
  );
};

export default TabAccounting;