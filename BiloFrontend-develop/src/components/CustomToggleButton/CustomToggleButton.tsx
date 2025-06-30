import {
    Box,
    Text,
    forwardRef,
  } from "@chakra-ui/react";
  import type { BoxProps } from "@chakra-ui/react";
  
  export interface CustomToggleButtonProps {
    label: string;
    value?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    onToggle?: (newValue: boolean) => void;
    isChecked?: boolean;
    colorScheme?: string;
    boxStyle?: BoxProps;
    fitContent?: boolean;
  }
  
  export const CustomToggleButton = forwardRef<CustomToggleButtonProps, "input">(
    (props, ref) => {
      const {
        label,
        fontSize = "xl",
        width,
        height,
        isChecked = false,
        onToggle,
        boxStyle,
        fitContent,
      } = props;
  
      const handleClick = () => {
        if (onToggle) {
          onToggle(!isChecked);
        }
      };
  
      return (
        <Box
          as="button"
          type="button"
          onClick={handleClick}
          borderWidth="2px"
          borderRadius="md"
          boxShadow="md"
          py={3}
          px={fitContent ? 4 : 2}
          w={width}
          h={height}
          textAlign="center"
          transition="all 0.2s"
          fontWeight="bold"
          fontSize={fontSize}
          color={isChecked ? "white" : "gray.700"}
          bg={isChecked ? "orange.500" : "white"}
          borderColor={isChecked ? "orange.500" : "gray.300"}
          _hover={{ borderColor: "orange.400" }}
          cursor="pointer"
          {...boxStyle}
        >
          <Text>{label}</Text>
        </Box>
      );
    }
  );
  