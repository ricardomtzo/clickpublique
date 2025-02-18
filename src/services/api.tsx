import { environment } from "@/environments/environment";
import axios from "axios";

const api = axios.create({
  baseURL: environment.apiUrl, // Defina a URL base da API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;