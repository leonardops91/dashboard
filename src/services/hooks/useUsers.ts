import { useQuery } from "react-query"
import { api } from "../api"
import { User } from "../mirage"


export function useUsers() {
    return useQuery('users', async () => {
        const { data } = await api.get('users')
    
        const users = data.users.map((user: User) => {
          return {
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {day: '2-digit', month: 'long', year: 'numeric'})
          }
        })
        return users
      }, { staleTime: 1000 * 5} )
}