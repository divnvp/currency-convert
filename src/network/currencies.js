import { api } from "./api";

export async function fetchCurrencies() {
  const response = await fetch(
    `${api.baseURL}/daily_json.js`, {
      method: "GET"
    }
  );
  return await response.json();
}
