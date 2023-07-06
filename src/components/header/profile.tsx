import { Flex, Avatar, Box, Text, Popover, Portal, PopoverContent, PopoverTrigger, Button, useBreakpointValue } from "@chakra-ui/react";
import { useAuthentication } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { server } from '../../main'

interface ProfileProps {
    showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useAuthentication()
  const navigation = useNavigate()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  function handleLogout() {
    signOut()
    navigation('/')
  }
  return (
    <Flex align={"center"}>
      {showProfileData && (
        <Box mr={"4"} textAlign={"right"}>
          <Text>Leonardo Souza</Text>
          <Text color={"gray.300"} fontSize={"small"}>
            {user?.email}
          </Text>
        </Box>
      )}
      {isWideVersion ? (
        <Popover >
          <PopoverTrigger>
            <Button bg='none' w='0' _hover={{ bg: "none" }}>
              <Avatar
                size={"md"}
                name='Leonardo Souza'
                src='https://avatars.githubusercontent.com/u/55004732?v=4'
              />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              bg='gray.700'
              border='none'
              w={20}
              alignItems='center'
              transitionProperty={"all"}
              transitionDuration={".1s"}
              _hover={{ bg: "gray.500" }}
              _active={{ bg: "gray.900" }}
              onClick={handleLogout}
              cursor='pointer'
            >
              <Text>Sair</Text>
            </PopoverContent>
          </Portal>
        </Popover>
      ) : (
          <Avatar
            size={"md"}
            name='Leonardo Souza'
            src='https://avatars.githubusercontent.com/u/55004732?v=4'
          />
      )}
      
    </Flex>
  );
}