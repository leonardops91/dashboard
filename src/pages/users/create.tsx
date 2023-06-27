import { Box, Button, Divider, Flex, HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { Input } from "../../components/form/input";
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";

type CreateUserFormData = {
    name: string,
    email: string,
    password: string,
    passwordConfirmation?: string
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatório').min(6, 'Senha de no mínimo 6 caracteres'),
    passwordConfirmation: yup.string().oneOf([undefined, yup.ref('password')], 'As senhas precisam coincidir')
})

export default function CreateUser() {
    const {register, handleSubmit, formState} = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
        await new Promise((resolve) => {setTimeout(resolve, 2000)})
console.log(data);

    }
    return (
      <Box
        as='form'
        onSubmit={handleSubmit(handleCreateUser)}
        h='fit-content'
        flex='1'
        borderRadius={8}
        bg='gray.800'
        p='8'
      >
        <Heading size='lg' fontWeight='normal'></Heading>
        <Divider my='6' borderColor='gray.700' />
        <VStack spacing='8'>
          <SimpleGrid minChildWidth='240px' spacing={["6", "8"]} w='100%'>
            <Input
              label='Nome completo'
              type='text'
              error={formState.errors.name}
              {...register("name")}
            />
            <Input
              label='E-mail'
              type='email'
              error={formState.errors.email}
              {...register("email")}
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth='240px' spacing={["6", "8"]} w='100%'>
            <Input
              label='Senha'
              type='password'
              error={formState.errors.password}
              {...register("password")}
            />
            <Input
              label='Confirmação de senha'
              type='password'
              error={formState.errors.passwordConfirmation}
              {...register("passwordConfirmation")}
            />
          </SimpleGrid>
        </VStack>
        <Flex mt='8' justify='flex-end'>
          <HStack spacing='4'>
            <Button as='a' href='/users' colorScheme='whiteAlpha'>
              Cancelar
            </Button>
            <Button
              type='submit'
              isLoading={formState.isSubmitting}
              colorScheme='purple'
            >
              Salvar
            </Button>
          </HStack>
        </Flex>
      </Box>
    );
}