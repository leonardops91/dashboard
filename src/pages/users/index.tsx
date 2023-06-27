import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Pagination from "../../components/pagination";

export default function UsersList() {
    return (
      <Box w='100%' h='80vh' flex='1' borderRadius={8} bg='gray.800'>
        <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
          <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
            <Flex mb='8' justify='space-between' align='center'>
              <Heading size='lg' fontWeight='normal'>
                Usuários
              </Heading>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme={'purple'}
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                href='/users/create'
              >
                Criar novo
              </Button>
            </Flex>
            <Table colorScheme='whiteAlpha' w='100%'>
              <Thead>
                <Tr>
                  <Th px='6' color='gray.300' w='8'>
                    <Checkbox colorScheme='blue' />
                  </Th>
                  <Th>Usuário</Th>
                  <Th>Data de cadastro</Th>
                  <Th w='8'>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td px='6'>
                    <Checkbox colorScheme='blue' />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>Leonardo Souza</Text>
                      <Text fontSize='sm' color='gray.300'>
                        Leonardo@email.com
                      </Text>
                    </Box>
                  </Td>
                  <Td>04 de Abril, 2021</Td>
                  <Td>
                    <Button
                      as='a'
                      size='sm'
                      fontSize='sm'
                      colorScheme='blue'
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td px='6'>
                    <Checkbox colorScheme='blue' />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>Leonardo Souza</Text>
                      <Text fontSize='sm' color='gray.300'>
                        Leonardo@email.com
                      </Text>
                    </Box>
                  </Td>
                  <Td>04 de Abril, 2021</Td>
                  <Td>
                    <Button
                      as='a'
                      size='sm'
                      fontSize='sm'
                      colorScheme='blue'
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td px='6'>
                    <Checkbox colorScheme='blue' />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>Leonardo Souza</Text>
                      <Text fontSize='sm' color='gray.300'>
                        Leonardo@email.com
                      </Text>
                    </Box>
                  </Td>
                  <Td>04 de Abril, 2021</Td>
                  <Td>
                    <Button
                      as='a'
                      size='sm'
                      fontSize='sm'
                      colorScheme='blue'
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td px='6'>
                    <Checkbox colorScheme='blue' />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>Leonardo Souza</Text>
                      <Text fontSize='sm' color='gray.300'>
                        Leonardo@email.com
                      </Text>
                    </Box>
                  </Td>
                  <Td>04 de Abril, 2021</Td>
                  <Td>
                    <Button
                      as='a'
                      size='sm'
                      fontSize='sm'
                      colorScheme='blue'
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Pagination />
          </Box>
        </Flex>
      </Box>
    );
}