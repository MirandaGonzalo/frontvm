import {
  Box,
  VStack,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import loginImage from '../../assets/images/loginBackground.svg';
import logoBiloComplete from '../../assets/images/logoBiloComplete.svg';
import ButtonBilo from '../../components/Button/ButtonBilo';
import UseLoginController from './login.controller';
import { useAuthStore } from '@/store/auth.store';

const LoginPage = () => {

  const { register, handleSubmit, onSubmit, errors } = UseLoginController()
  const { loading } = useAuthStore()

  const mssgErrorStyle = {
    fontSize: 'xl',
  };


  return (
    <Box
      w="100vw"
      h="100vh"
      bgImage={loginImage}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="35rem"
        h="50rem"
        bg="white"
        borderRadius="2rem"
        boxShadow="lg"
        p="2rem"
      >
        <Image src={logoBiloComplete} boxSize="20rem" />

        <VStack gap="1rem" align="stretch" w="90%" alignItems="center">
          <FormControl isInvalid={!!errors.username}>
            <FormLabel fontSize="2xl" fontWeight="500">
              Usuario
            </FormLabel>
            <Input placeholder="Usuario" {...register('username')} h="3rem" />
            <FormErrorMessage {...mssgErrorStyle} >{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel fontSize="2xl" fontWeight="500">
              Contraseña
            </FormLabel>
            <Input placeholder="Contraseña" type="password" {...register('password')} h="3rem"/>
            <FormErrorMessage {...mssgErrorStyle} >{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <ButtonBilo
            type="submit"
            colorScheme="orange"
            title="Iniciar Sesión"
            w="100%"
            mt="2rem"
            isLoading={loading}
          />
        </VStack>
      </VStack>
    </Box>
  );
};

export default LoginPage;
