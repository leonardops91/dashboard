import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Text, useBreakpointValue } from "@chakra-ui/react";
import { SidebarNav } from "./sidebarNav";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Profile } from "../header/profile";
import { useAuthentication } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { server } from "../../main";

export function Sidebar() {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })
  const { signOut} = useAuthentication()
  const navigation = useNavigate()

  function handleLogout() {
    signOut()
    navigation('/')
  }
  if(isDrawerSidebar) {
    const { isOpen, onClose } = useSidebarDrawer()

    return (
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg='gray.800' p='4'>
            <DrawerCloseButton mt='6' />
            <DrawerHeader>
              <Profile showProfileData={isDrawerSidebar} />
            </DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
            {isDrawerSidebar && (
              <DrawerFooter>
                <Text textAlign='left' fontSize={18} onClick={handleLogout}>
                  Sair
                </Text>
              </DrawerFooter>
            )}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
    return (
      <Box as="aside" w="64" mr="8">
        <SidebarNav />
      </Box>
    );
}