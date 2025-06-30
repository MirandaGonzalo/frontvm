import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './styles/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
)