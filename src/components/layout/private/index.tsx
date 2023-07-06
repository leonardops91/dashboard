import { Center, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { Header } from "../../header";
import { Sidebar } from "../../sidebar";
import { Outlet } from 'react-router-dom';
import { useAuthentication } from "../../../contexts/AuthContext";
import { RiLockFill } from "react-icons/ri";

export default function PrivateRouter() {
  const { isAuthenticated } = useAuthentication()
  const token = window.localStorage.getItem('auth.token')
  

  if (isAuthenticated) {
    return (
      <>
        <Header />
        <Flex w='100%' h='100vh' my='6' maxWidth={1480} mx='auto' px='6'>
          <Sidebar />
          <Outlet />
        </Flex>
      </>
    );
  } else if(!token) {
    return (
        <Center h='100vh' gap={2} flexDir='column' fontSize={20}>
          <RiLockFill fontSize={30} />
            <Text>Nossa, Que pena! você não possui autorização para trilhar esse caminho</Text>
            <Text>Faça <Link href="/" color='blue.500'>login</Link> para continuar sua jornada!</Text>
        </Center>
    );
  } else {
    return (
      <Center h='100vh'>
        <Spinner />
      </Center>
    );
  }
}
