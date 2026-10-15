import axios from "axios";

export const api=axios.create(
  {
    baseURL: "http://localhost:8061/api/user",
  }
)
export const api1=axios.create(
  {
    baseURL: "http://localhost:8061/api/posts",
  }
)
export const api2=axios.create(
  {
  baseURL: "http://localhost:8061/api/auth",
  }
)
