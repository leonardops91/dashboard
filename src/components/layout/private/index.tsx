import { Flex } from "@chakra-ui/react";
import { Header } from "../../header";
import { Sidebar } from "../../sidebar";
import { Outlet } from 'react-router-dom';

export default function PrivateRouter() {
  return (
    <>
      <Header />
      <Flex w='100%' h='100vh' my='6' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />
        <Outlet/>
      </Flex>
    </>
  );
}
