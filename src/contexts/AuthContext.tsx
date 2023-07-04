import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/authApi";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credencials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user?: User;
};

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await authApi.post("sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      window.localStorage.setItem("auth.token", token);
      window.localStorage.setItem("auth.refreshToken", refreshToken);

      setUser({ email, permissions, roles });

      authApi.defaults.headers['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const authToken = window.localStorage.getItem("auth.token");

    if(authToken) {
      authApi
        .get("/me")
        .then((resp) => {
          const { email, permissions, roles } = resp.data;
          setUser({ email, permissions, roles });
        })
        .catch((error) => {
          console.log(error);
          
        });
    }
  }, [])
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthentication = () => useContext(AuthContext);
