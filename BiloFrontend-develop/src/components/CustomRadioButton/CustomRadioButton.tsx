import {
  useRadio,
  Box,
  Text,
  forwardRef,
} from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

export interface CustomRadioButtonProps {
  label: string;
  value: string;
  fontSize?: string;
  width?: string;
  height?: string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | (() => void);
  isChecked?: boolean;
  colorScheme?: string;
  boxStyle?: BoxProps;
  fitContent?: boolean;
}

export const CustomRadioButton = forwardRef<CustomRadioButtonProps, "input">(
  (props, ref) => {
    const { getInputProps, getRadioProps, state } = useRadio(props);

    const input = getInputProps({ ref });
    const radio = getRadioProps();



    return (
      <Box as="label" cursor="pointer">
        <input {...input} onChange={props.onChange}/>
        <Box
          {...radio}
          borderWidth="2px"
          borderRadius="md"
          boxShadow="md"
          py={3}
          px={props.fitContent ? 4 : 2}
          w={props.width}
          h={props.height}
          textAlign="center"
          transition="all 0.2s"
          fontWeight="bold"
          fontSize={props.fontSize || "xl"}
          color={state.isChecked ? "white" : "gray.700"}
          bg={state.isChecked ? "orange.500" : "white"}
          borderColor={state.isChecked ? "orange.500" : "gray.300"}
          _hover={{ borderColor: "orange.400" }}
          {...props.boxStyle}
        >
          <Text>{props.label}</Text>
        </Box>
      </Box>
    );
  }
);