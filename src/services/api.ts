import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:5173/api'
})

export const authApi = axios.create({
    baseURL: 'http://localhost:3333'
})