import axios from "axios";

// Pilih baseURL berdasarkan lingkungan (development atau production)
const baseURL = "http://localhost:8080/api/v1";
//   process.env.NODE_ENV === "development"
//     ? process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
//     : process.env.NEXT_PUBLIC_API_URL_PRODUCTION;

// Buat instance Axios
export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
