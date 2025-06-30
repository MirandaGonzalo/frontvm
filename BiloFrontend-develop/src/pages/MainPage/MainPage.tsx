import { Box, Image } from "@chakra-ui/react"
import logoBiloComplete from "../../assets/images/logoBiloComplete.svg"

const MainPage = () => {

  return (
    <Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
      <Image src={logoBiloComplete} boxSize={"30rem"}/>
    </Box>
  )
}

export default MainPage