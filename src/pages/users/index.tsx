import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, Spinner } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Pagination from "../../components/pagination";
import { useQuery } from 'react-query'
import { User } from '../../services/mirage'

export default function UsersList() {
  const {isLoading, data, error} = useQuery('users', async () => {
    const response = await fetch('http://127.0.0.1:5173/api/users')
    const data = await response.json()

    const users = data.users.map((user: User) => {
      return {
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {day: '2-digit', month: 'long', year: 'numeric'})
      }
    })
    return users
  }, { staleTime: 1000 * 5} )

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
                colorScheme={"purple"}
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                href='/users/create'
              >
                Criar novo
              </Button>
            </Flex>
            {isLoading ? (
              <Flex justify='center'>
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex>Falha ao obter dados dos usuários</Flex>
            ) : (
              <>
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
                  {data.map((user: User) => {
                    return (
                      <Tr key={user.email}>
                        <Td px='6'>
                          <Checkbox colorScheme='blue' />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight='bold'>{user.name}</Text>
                            <Text fontSize='sm' color='gray.300'>
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        <Td>{user.createdAt}</Td>
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
                    );
                  })}
                </Tbody>
              </Table>
            <Pagination />
            </>
            )}
          </Box>
        </Flex>
      </Box>
    );
}