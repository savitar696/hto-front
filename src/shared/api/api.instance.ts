import axios from "axios"

export const api = axios.create({
  baseURL: "http://26.187.148.14:5000" + "/api",
})
