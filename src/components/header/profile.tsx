import { Flex, Avatar, Box, Text } from "@chakra-ui/react";
import { useAuthentication } from "../../contexts/AuthContext";

interface ProfileProps {
    showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useAuthentication()
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
      <Avatar
        size={"md"}
        name='Leonardo Souza'
        src='https://avatars.githubusercontent.com/u/55004732?v=4'
      />
    </Flex>
  );
}