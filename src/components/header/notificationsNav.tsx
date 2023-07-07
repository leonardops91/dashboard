import { Avatar, Button, Flex, HStack, Icon, Link, Popover, PopoverContent, PopoverTrigger, Portal, Text } from "@chakra-ui/react";
import { RiNotification4Line, RiUserAddLine } from "react-icons/ri";
import { NavLink } from "../sidebar/navLink";

export function NotificationNav() {


  function handleOpenNotifications() {

  }
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py='1'
      color='gray.300'
      borderRightWidth={1}
      borderColor='gray.700'
    >
      <Popover>
        <PopoverTrigger>
          <Button w='0' bg='none' color='gray.300' _hover={{ bg: "none", color:'gray.50' }}>
            <NavLink
              as={Flex}
              href='#'
              onClick={handleOpenNotifications}
              alignItems='center'
              justifyContent='center'
              transition='all .2s'
              _hover={{ color: "gray.50" }}
            >
              <Icon as={RiNotification4Line} fontSize={20} />
            </NavLink>
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            p={5}
            w='fit-content'
            bg='gray.700'
            border='none'
            alignItems='center'
            transitionProperty={"all"}
            transitionDuration={".1s"}
            cursor='pointer'
          >
            <Text>Nenhuma notificação</Text>
          </PopoverContent>
        </Portal>
      </Popover>

      <NavLink
        href='../users/create'
        alignItems='center'
        justifyContent='center'
        transition='all .2s'
        _hover={{ color: "gray.50" }}
      >
        <Icon as={RiUserAddLine} fontSize={20} />
      </NavLink>
    </HStack>
  );
}