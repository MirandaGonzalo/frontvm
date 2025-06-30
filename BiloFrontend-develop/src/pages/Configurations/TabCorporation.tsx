import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
} from '@chakra-ui/react';
import SelectBilo from '@/components/Select/SelectBilo';
import ButtonBilo from '@/components/Button/ButtonBilo';
import { withMask } from 'use-mask-input';
import { useState } from 'react';
import { getProvinces, getLocalidades } from '@/services/address.service';
import { useQuery } from '@tanstack/react-query';

const TabCorporation = () => {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string | null>(null);
  
  const inputStyle = {
    h: '3rem',
    w: '90%',
  };

  const labelStyle = {
    fontSize: 'xl',
    fontWeight: '600',
  };

  type Location = {
    id: string;
    nombre: string;
  };

  type Option = {
    value: string;
    label: string;
  };

  const { data: provinces } = useQuery<Location[], Error, Option[]>({
    queryKey: ['provinces'],
    queryFn: getProvinces,
    select: (data: Location[]) => 
      data.map((provincia: Location) => ({
        label: provincia.nombre,
        value: provincia.id,
      })).sort((a, b) => a.label.localeCompare(b.label)),
  });

  const { data: localidades } = useQuery<Location[], Error, Option[]>({
    queryKey: ['localidades', provinciaSeleccionada],
    queryFn: () => getLocalidades(provinciaSeleccionada!),
    enabled: !!provinciaSeleccionada,
    select: (data: Location[]) =>
      data.map((localidad: Location) => ({
        label: localidad.nombre,
        value: localidad.id,
      })).sort((a, b) => a.label.localeCompare(b.label)),
  });

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
              Razón Social 
            </FormLabel>
            <Input placeholder="Ingresá razón social" {...inputStyle} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              CUIT 
            </FormLabel>
            <Input
              placeholder="Ingresá CUIT"
              {...inputStyle}
              ref={withMask('99-99999999-9')}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Teléfono 
            </FormLabel>
            <Input
              placeholder="Ingresá un teléfono"
              {...inputStyle}
              ref={withMask('(999) 9999999')}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Email 
            </FormLabel>
            <Input placeholder="Ingresá un email" {...inputStyle} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Provincia 
            </FormLabel>
            <Box {...inputStyle}>
              <SelectBilo
                options={provinces ?? []}
                placeholder="Seleccioná una provincia"
                onChange={(option) => setProvinciaSeleccionada(String(option?.value))}
                error={false}
              />
            </Box>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Localidad 
            </FormLabel>
            <Box {...inputStyle}>
              <SelectBilo
                key={provinciaSeleccionada}
                placeholder="Seleccioná una localidad"
                options={localidades ?? []}
              />
            </Box>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Barrio
            </FormLabel>
            <Input placeholder="Ingresá un barrio" {...inputStyle} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={false}>
            <FormLabel {...labelStyle}>
              Calle 
            </FormLabel>
            <Input placeholder="Ingresá una calle" {...inputStyle} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <HStack spacing="1rem" width="100%">
            <FormControl isInvalid={false} flex="1">
              <FormLabel {...labelStyle}>
                Nro 
              </FormLabel>
              <Input placeholder="Ingresá un número" />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={false} flex="1">
              <FormLabel {...labelStyle}>
                Piso
              </FormLabel>
              <Input placeholder="Ingresá un piso" />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={false} flex="1">
              <FormLabel {...labelStyle}>
                Departamento
              </FormLabel>
              <Input placeholder="Ingresá un departamento" />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
          </HStack>
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

export default TabCorporation;