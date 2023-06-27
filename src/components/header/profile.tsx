import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align={"center"}>
      {showProfileData && (
        <Box mr={"4"} textAlign={"right"}>
          <Text>Leonardo Souza</Text>
          <Text color={"gray.300"} fontSize={"small"}>
            Leonardo@email.com
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