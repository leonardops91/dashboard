import axios, { AxiosError } from "axios";
import { createMirageServer, shutDownMirageServer } from "./mirage/server";

const token = window.localStorage.getItem("auth.token");
let isRefreshing = false
let failedRequestsQueue: { onSuccess: (token: string) => void; onFailure: (error: AxiosError<unknown, any>) => void; }[] = []

export const authApi = axios.create({
  baseURL: "http://localhost:3333",
  headers: { 'Authorization': `Bearer ${token}` },
});

//intercepta retorno do servidor a procura de erro de token expirado e faz refresh 
authApi.interceptors.response.use(
  (response) => {
    return response;
},
(error) => {
    if (error.response.status === 401) {
        if (error.response.data.code === "token.expired") {
        const refreshToken = window.localStorage.getItem("auth.refreshToken");

        const originalConfig = error.config

        if(!isRefreshing){
            isRefreshing = true
            shutDownMirageServer()
            authApi
            .post("refresh", {
                refreshToken
            })
            .then((response) => {
                const { token, refreshToken } = response.data;
                
                window.localStorage.setItem("auth.token", token);
                window.localStorage.setItem("auth.refreshToken", refreshToken);
                
                authApi.defaults.headers["Authorization"] = `Bearer ${token}`;

                failedRequestsQueue.forEach(request => request.onSuccess(token))
                failedRequestsQueue = []
            }).catch(error => {
                failedRequestsQueue.forEach(request => request.onFailure(error))
                failedRequestsQueue = []
            }).finally(() => {
                isRefreshing = false;
                createMirageServer()
            });
        }
        return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
                onSuccess: (token: string) => {
                    originalConfig.headers['Authorization'] = `Bearer ${token}`

                    resolve(authApi(originalConfig))
                },
                onFailure: (error: AxiosError) => {
                    reject(error)
                }
            })
        })
      } else {
        window.localStorage.clear()
      }
    }
    return Promise.reject(error)
    }
    
);
