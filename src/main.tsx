import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme.ts'
import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext.tsx'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <App />
      </SidebarDrawerProvider>
    </ChakraProvider>
  </React.StrictMode>
);
