import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
    return (
        <Flex
          as="label"
          flex={1}
          bg={"gray.700"}
          h={8}
          align={"center"}
          ml="24"
          px={4}
          borderRadius={"full"}
        >
          <Input
            name="search"
            placeholder="Buscar na plataforma"
            bg={"gray.700"}
            h={6}
            variant={"unstyled"}
            _placeholder={{ fontSize: "12px", fontWeight: "bold" }}
          />
          <Icon as={RiSearchLine} fontSize={20} />
        </Flex>
    )
}