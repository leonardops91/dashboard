import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/authApi";
import { AxiosError } from "axios";
import { server } from "../main";
import { makeServer } from "../services/mirage";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

export type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credencials: SignInCredentials): Promise<SignInCredentials | unknown>;
  signOut(): void;
  isAuthenticated: boolean;
  isRefreshing: boolean;
  setIsRefreshing(isRefreshing: boolean): void;
  user?: User;
};

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const [isRefreshing, setIsRefreshing] = useState(false)

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
      return response
    } catch (error) {
      const loginError = error as AxiosError
      return loginError.response
      
    }
  }

  const authChannel = new BroadcastChannel('auth')

  function signOut() {
    window.localStorage.clear()
    setUser(undefined)
    server.shutdown();
    authChannel.postMessage('signOut')
  }

  useEffect(() => {
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut()
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const authToken = window.localStorage.getItem("auth.token");

    if(authToken) {
      server.shutdown()
      setIsRefreshing(true)
      authApi
        .get("/me")
        .then((resp) => {
          const { email, permissions, roles } = resp.data;
          setUser({ email, permissions, roles });
        })
        .catch(() => {
          window.localStorage.clear()
        });
        makeServer()
        setIsRefreshing(false)

    }
  }, [])
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, isRefreshing, setIsRefreshing, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthentication = () => useContext(AuthContext);
