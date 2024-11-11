const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

if (!API_KEY) {
  throw new Error("Exchange Rate API key is not defined in .env file. Please add NEXT_PUBLIC_EXCHANGE_RATE_API_KEY to your .env file");
}

export interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: { [key: string]: number };
  conversion_result?: number;
  conversion_rate?: number;
}

export async function getExchangeRate(fromCurrency: string, toCurrency: string, amount: number = 1) {
  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
} 