import { API_BASE_URL } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
