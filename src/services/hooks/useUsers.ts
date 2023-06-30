import { useQuery } from "react-query"
import { api } from "../api"
import { User } from "../mirage"

type GetUsersResponse = {
    users: User[],
    totalCount: number
}

export async function getUsers(currentPage: number, perPage: number): Promise<GetUsersResponse>{
    const { data, headers } = await api.get('users', {
        params: {
            page: currentPage,
            per_page: perPage
        }
    })
    const totalCount = Number(headers['x-total-count'])

    const users = data.users.map((user: User) => {
      return {
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {day: '2-digit', month: 'long', year: 'numeric'})
      }
    })
    return {
        users,
        totalCount
    }
  }

export function useUsers(currentPage: number, perPage: number) {
    return useQuery([ "users", currentPage ], () => getUsers(currentPage, perPage), {
      staleTime: 1000 * 5,
    });
}