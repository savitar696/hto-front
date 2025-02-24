import axios from "axios"

export const api = axios.create({
  baseURL: "https://hto-backend-mb8nut-612117-77-239-116-138.traefik.me" + "/api",
})
