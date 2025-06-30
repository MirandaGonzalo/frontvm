import { VStack, Image, HStack, Heading, Text } from "@chakra-ui/react"
import notFoundImage from '@/assets/images/notFoundPageImage.png'
import ButtonBilo from "@/components/Button/ButtonBilo"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
   <HStack h="100vh" w="100vw" alignItems="center" justifyContent="center" alignContent="center" gap="10rem">
    <Image src={notFoundImage} alt="pagina no encontrada" boxSize="300px" />
    <VStack >
      <Heading fontSize="100px">404</Heading>
      <Text fontSize="40px">Página no encontrada</Text>
      <ButtonBilo title="Volver al Inicio" onClick={() => navigate('/')} size="xl" fontSize="20px" mt="2rem"/>
    </VStack>
   </HStack>
  )
}

export default NotFoundPage