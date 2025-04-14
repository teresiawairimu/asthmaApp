import axios from "axios";
import { api_base_url } from "./apiConfig";

const weather_api_url = `${api_base_url}/api/weather`;


export const retrieveWeather = async(idToken) => {
  console.log("Id token:", idToken);
  try {
    const response = await axios.get(`${weather_api_url}`,
      {
        
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("weather_api_url", weather_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};