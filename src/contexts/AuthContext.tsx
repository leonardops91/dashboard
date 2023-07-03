import { ReactNode, createContext, useContext } from "react";
import { authApi } from "../services/api";

type SignInCredentials = {
    email: string
    password: string
}

type AuthContextData = {
    signIn(credencials: SignInCredentials): Promise<void>
    isAuthenticated: boolean
}

const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const isAuthenticated = false

    async function signIn({email, password}:SignInCredentials) {
        try {
            console.log('teste')
            const response = await authApi.post('sessions', {
                email, 
                password
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <AuthContext.Provider value={{signIn, isAuthenticated}}>{children}</AuthContext.Provider>
    )
}

export const useAuthentication = () => useContext(AuthContext)