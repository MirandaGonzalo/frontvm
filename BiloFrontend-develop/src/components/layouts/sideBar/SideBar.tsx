import { Box, Flex, Image, VStack, useMediaQuery, useDisclosure, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, CloseButton } from '@chakra-ui/react';
import styles from './sideBar.module.scss';
import bilo from '../../../assets/images/logoBilo.svg';
import clientIcon from '../../../assets/icons/client.svg';
import productIcon from '../../../assets/icons/product.svg';
import configIcon from '../../../assets/icons/monitor-cog.svg';
import supportIcon from '../../../assets/icons/clipboard-list.svg';
import BtnSideBar from '../btnSideBar/BtnSideBar';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

const SideBar = () => {
  const navigate = useNavigate();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const SideBarContent = () => (
    <Box
      className={styles.sidebarContainer}
      bg="blue.600"
      w={isLargerThan768 ? "20rem" : "100%"}
      maxW={isLargerThan768 ? "20rem" : "100%"}
      h={isLargerThan768 ? "calc(100vh - 1.5rem)" : "100vh"}
      m={isLargerThan768 ? "0.75rem" : "0"}
      borderRadius={isLargerThan768 ? "2rem" : "0"}
      boxShadow="md"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      p={5}
      color="white"
    >
      <Flex
        bg="white"
        borderRadius="1.5rem"
        w="16rem"
        h="6rem"
        alignItems="center"
        justifyContent="center"
        mt="1rem"
        mb="2rem"
      >
        <Image src={bilo} alt="Bilo" w="10rem" onClick={() => navigate("/")} cursor="pointer"/>
      </Flex>
      <VStack w="100%">
        <BtnSideBar title="Clientes" icon={clientIcon} route="/clientes" />
        <BtnSideBar title="Productos" icon={productIcon} route="/productos" />
        <BtnSideBar title="Configuración" icon={configIcon} route="/configuraciones" />
        <BtnSideBar title="Soporte" icon={supportIcon} route="/" />
      </VStack>
    </Box>
  );

  if (!isLargerThan768) {
    return (
      <>
        <IconButton
          aria-label="Abrir menú"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          position="fixed"
          top="1rem"
          left="1rem"
          zIndex="10"
          colorScheme="blue"
          size="lg"
          borderRadius="full"
        />

        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody p={0}>
              <CloseButton position="absolute" right="0.5rem" top="0.5rem" onClick={onClose} zIndex="11" />
              <SideBarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return <SideBarContent />;
};

export default SideBar;
