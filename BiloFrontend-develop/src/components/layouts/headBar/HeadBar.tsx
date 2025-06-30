import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
//import logoDamiani from '../../../assets/images/logoDamiani.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import profileIcon from '../../../assets/icons/circle-user-round.svg'
import keyIcon from '../../../assets/icons/key-round.svg'
import logOutIcon from '../../../assets/icons/log-out.svg'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { logOut } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const HeadBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBox = () => setIsOpen(!isOpen);
  const [breadcrumbs, setBreadcrumbs] = useState<{name: string, path: string}[]>([]);

  const boxRef = useRef(null);
  useOutsideClick({
    ref: boxRef,
    handler: () => setIsOpen(false),
  });

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const pathnames = location.pathname.split('/').filter(x => x && isNaN(Number(x)));
    const breadcrumbItems = [];
    
    breadcrumbItems.push({
      name: 'Home',
      path: '/'
    });
    
    let currentPath = '';
    pathnames.forEach(path => {
      currentPath += `/${path}`;
      
      const readableName = path.charAt(0).toUpperCase() + 
        path.slice(1).replace(/-/g, ' ');
      
      breadcrumbItems.push({
        name: readableName,
        path: currentPath
      });
    });
    
    setBreadcrumbs(breadcrumbItems);
  }, [location]);

  const { mutate: logOutMutation } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.info('Sesión Cerrada');
      useAuthStore.setState({ isAuthenticated: false });
      navigate('/login');
    },
    onError: () => {
      toast.error('Hubo un problema al cerrar sesión');
      useAuthStore.setState({ isAuthenticated: false });
      navigate('/login');
    },
  });

  
  return (
    <Box position="relative" w="100%">

      <HStack
        bg="dark.900"
        w="100%"
        h="5rem"
        borderRadius="full"
        px={5}
        py={3}
        color="white"
        justifyContent="space-between"
        boxShadow="md"
      >
        <Breadcrumb spacing="0.5rem" separator={<ChevronRightIcon color="gray.300" />} ml={4}>
          {breadcrumbs.map((breadcrumb, index) => (
            <BreadcrumbItem key={index} isCurrentPage={index === breadcrumbs.length - 1}>
              <BreadcrumbLink
                onClick={() => navigate(breadcrumb.path)}
                fontSize="xl"
                fontWeight={index === breadcrumbs.length - 1 ? "600" : "400"}
                color={index === breadcrumbs.length - 1 ? "white" : "gray.300"}
                _hover={{ color: "white", textDecoration: "none" }}
              >
                {breadcrumb.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        
        <HStack gap="0.8rem" onClick={toggleBox} cursor="pointer">
          <Text fontSize="xl" fontWeight="600">
            Damiani S.R.L.
          </Text>
          {/* TODO: Agregar imagen de Damiani cuando consiga una buena */}
          <Avatar size="md" name="Damiani S.R.L." fontWeight="600" color="white" bg="lightBlue.400" src={""}/>
        </HStack>
      </HStack>

      {isOpen && (
        <VStack
          ref={boxRef}
          position="absolute"
          top="5.5rem"
          right="0.8rem"
          bg="white"
          borderRadius="md"
          border="1px solid black"
          p={3}
          w="180px"
          zIndex="overlay"
        >
          {/* TODO: Cuando cree modulo configuracion cambiar textos en duro */}
          <Avatar size="lg" name="Damiani S.R.L." fontWeight="600" color="white" bg="lightBlue.400" src={""}/>
          <VStack spacing={1} align="center" w="100%">
            <Text fontWeight="bold" fontSize="xl">
              Damiani S.R.L.
            </Text>
            <Text fontWeight="400" fontSize="lg" color="gray.700">
              damiani@gmail.com
            </Text>
          </VStack>

          <Divider my="0.8rem" borderWidth="1px" borderColor="gray.400" />

          <VStack spacing={3} align="start" w="100%">
            <Flex
              align="center"
              cursor="pointer"
              _hover={{ color: 'orange.400' }}
            >
              <Image src={profileIcon} boxSize={5} mr={2} />
              <Text fontWeight="semibold" fontSize="xl">
                Mi Cuenta
              </Text>
            </Flex>{' '}
            <Flex
              align="center"
              cursor="pointer"
              _hover={{ color: 'orange.400' }}
            >
              <Image src={keyIcon} boxSize={5} mr={2} />
              <Text fontWeight="semibold" fontSize="xl">
                Cambiar Contraseña
              </Text>
            </Flex>
            <Flex
              align="center"
              cursor="pointer"
              _hover={{ color: 'orange.400' }}
              onClick={() => logOutMutation()}
            >
              <Image src={logOutIcon} boxSize={5} mr={2} />
              <Text fontWeight="semibold" fontSize="xl">
                Cerrar Sesión
              </Text>
            </Flex>
          </VStack>
        </VStack>
      )}
    </Box>
  );
};

export default HeadBar;
