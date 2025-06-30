import { Button, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import chevronRight from '../../../assets/icons/chevron-right.svg'

const BtnSideBar = ({
  title,
  icon,
  route
}: {
  title: string
  icon: string
  route: string
}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === route

  return (
    <Button
    onClick={() => navigate(route)}
    w="100%"
    bg={isActive ? "lightBlue.700" : "blue.600"}
    _hover={{ bg: "lightBlue.400" }}
    color="white"
    fontSize="xl"
    fontWeight="500"
    rounded="full"
    py={7}
    boxShadow={isActive ? "md" : "none"}
  >
    <Flex align="center" justify="space-between" w="100%">
      <HStack gap="1rem">
      <Image src={icon} alt="icon" boxSize="20px" />
      <Text  textAlign="center">
        {title}
      </Text>
      </HStack>
      <Image src={chevronRight} alt="chevron" boxSize="20px" />
    </Flex>
  </Button>
  
  )
}

export default BtnSideBar
