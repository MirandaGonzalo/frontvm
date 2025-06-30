import { Button, Spinner } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

interface CustomButtonProps extends ButtonProps {
  title: string;
  colorScheme?: 'orange' | 'lightBlue' | 'black' | 'blue' | 'gray' | 'white';
  color?: string;
  isLoading?: boolean;
  leftIconSrc?: string; 
}

const CustomButton = ({ title, colorScheme = 'orange', color = 'white', isLoading = false, leftIconSrc, ...rest }: CustomButtonProps) => {
  return (
    <Button
      bg={`${colorScheme}.400`}
      _hover={{ bg: `${colorScheme}.500` }}
      color={color}
      fontSize="xl"
      fontWeight="400"
      rounded="full"
      py={7}
      px={12}
      width="auto"
      leftIcon={leftIconSrc ? <Image src={leftIconSrc} alt="icon" boxSize="2rem" mr={1} objectFit="contain"/> : undefined}
      {...rest}
    >
      {title}
      {isLoading && <Spinner size="md" ml={2} color="white" />}
    </Button>
  );
};

export default CustomButton;
