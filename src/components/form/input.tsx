import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps{
    label?: string,
    placeholder?: string
    name: string
    error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({label, placeholder, name, error=null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput
          bg={"gray.900"}
          name={name}
          id={name}
          focusBorderColor={"purple.300"}
          variant={"filled"}
          _focus={{ bg: "gray.900" }}
          _hover={{ bg: "gray.900" }}
          ref={ref}
          placeholder={placeholder}
          {...rest}
        />
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
}

export const Input = forwardRef(InputBase);