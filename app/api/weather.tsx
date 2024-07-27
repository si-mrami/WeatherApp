import axios from "axios";

const API_KEY = "90157a2547cc0045a9182d72e0f5157d";
const BASE_URL = "https://api.weatherbit.io/v2.0";

export const getWeatherByCity = async (city: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/current`, {
      params: {
        city: city,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};
