import {
    useRadioGroup,
    HStack,
  } from "@chakra-ui/react";
import { CustomRadioButton } from "../CustomRadioButton/CustomRadioButton";
  
  export interface RadioOption {
    value: string;
    label: string;
  }
  
  interface CustomRadioGroupProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: RadioOption[];
  }
  
  export const CustomRadioGroup = ({
    name,
    value,
    onChange,
    options,
  }: CustomRadioGroupProps) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
      name,
      value,
      onChange,
    });
  
    const group = getRootProps();
  
    return (
      <HStack spacing={4} {...group}>
        {options.map((option) => {
          const radio = getRadioProps({ value: option.value });
          return (
            <CustomRadioButton
              key={option.value}
              label={option.label}
              {...radio}
              value={option.value}
              fontSize="xl"
              width="9rem"
              height="4rem"
            />
          );
        })}
      </HStack>
    );
  };
  