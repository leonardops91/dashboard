import { Flex, Text } from "@chakra-ui/react";

export function Logo() {
    return (
      <Flex
        align='center'
        justify='center'
        borderLeft='1px'
        minW='48'
        border='1px'
      >
        <Text fontWeight={"bold"} fontSize={['2xl', '5xl']}>
          dash
        </Text>
        <Text as='span' color={"purple.400"} fontSize={['2xl', '5xl']} fontWeight={"bold"} >
          .
        </Text>
      </Flex>
    );
}