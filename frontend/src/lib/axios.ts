import axios from "axios";

const defaultApiUrl =
  process.env.NODE_ENV === "production" ? "/_backend" : "http://localhost:4000";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? defaultApiUrl,
  headers: { "Content-Type": "application/json" },
});
