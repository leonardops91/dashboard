import { Center, Flex, Button, Stack } from "@chakra-ui/react";
import { FieldError, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/form/input"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthentication } from "../../contexts/AuthContext";

type SignInFormData = {
  email: string,
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório!').email('Formato de e-mail inválido'),
  password: yup.string().required('Password obrigatório!')
})

export default function Home() {
    const { signIn, isAuthenticated } = useAuthentication()
    const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(signInFormSchema)
    })
    const errors = formState.errors

    const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
      await signIn(data)
    }
    return (
      <Center h={"100vh"}>
        <Flex
          as='form'
          direction={"column"}
          gap={3}
          bg={"gray.700"}
          p={10}
          w={"100%"}
          maxW={"384px"}
          borderRadius={8}
          shadow={"dark-lg"}
          onSubmit={handleSubmit(handleSignIn as SubmitHandler<FieldValues>)}
        >
          <Stack spacing={4}>
            <Input
              label='E-mail'
              type='email'
              placeholder='user@email.com'
              error={errors.email as FieldError}
              {...register("email")}
            />
            <Input
              label='Senha'
              type='password'
              placeholder='******'
              error={errors.password as FieldError}
              {...register("password")}
            />
          </Stack>
          <Button
            type='submit'
            bg={"purple.500"}
            color={"gray.50"}
            _hover={{ bg: "purple.300", color: "gray.900" }}
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Center>
    );
}