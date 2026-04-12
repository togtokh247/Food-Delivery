import axios from "axios";

const productionApiUrl = "https://food-delivery-obj2.vercel.app";
const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

const defaultApiUrl =
  process.env.NODE_ENV === "production"
    ? productionApiUrl
    : "http://localhost:4000";

export const api = axios.create({
  baseURL: configuredApiUrl || defaultApiUrl,
  headers: { "Content-Type": "application/json" },
});
