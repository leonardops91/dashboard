import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import { SearchBox } from "./searchBox";
import { Logo } from "./logo";
import { NotificationNav } from "./notificationsNav";
import { Profile } from "./profile";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";


export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  const { onOpen } = useSidebarDrawer()

    return (
      <Flex
        as='header'
        w={"100%"}
        maxW={1480}
        h='20'
        mt='4'
        px={6}
        align={"center"}
        mx={"auto"}
      >
        {!isWideVersion && 
          <IconButton onClick={onOpen} aria-label="Abrir menu lateral" icon={<Icon as={RiMenuLine} fontSize="24" />} variant="unstyled" mr='2' />
        }
        <Logo />
        {isWideVersion && <SearchBox />}
        <Flex align={"center"} ml={"auto"}>
          <NotificationNav />
          <Profile showProfileData={isWideVersion}/>
        </Flex>
      </Flex>
    );
}