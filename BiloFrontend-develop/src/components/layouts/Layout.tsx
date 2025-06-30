import { VStack, HStack, Box, useMediaQuery } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import SideBar from './sideBar/SideBar'
import HeadBar from './headBar/HeadBar'

const Layout = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  
  return (
    <HStack height="100vh" width="100vw" bg="gray.100" spacing={0}>
      <SideBar />
      <VStack 
        width={isLargerThan768 ? "calc(100vw - 24rem)" : "100vw"}
        height={"calc(100vh - 1.5rem)"}
        ml={isLargerThan768 ? 0 : "auto"}
        mr={"auto"}
        pt={!isLargerThan768 ? "3rem" : 0}
      >
        {isLargerThan768 && <HeadBar />}
        <Box 
          w="100%" 
          h='100%' 
          bg="white" 
          borderRadius={isLargerThan768 ? "1.5rem" : "0.8rem"} 
          mt={isLargerThan768 ? "0.3rem" : "0.8rem"}
          mx={!isLargerThan768 ? "0.8rem" : 0}
          p={isLargerThan768 ? "1.5rem" : "1.2rem"}
          overflow="auto"
        >
          <Outlet />
        </Box>
      </VStack>
    </HStack>
  )
}

export default Layout
