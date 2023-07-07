import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme.ts'
import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from './contexts/AuthContext.tsx'

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <App />
          </SidebarDrawerProvider>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
