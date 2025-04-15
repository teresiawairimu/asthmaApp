import axios from "axios";
import { api_base_url } from "./apiConfig";

const correlation_api_url = `${api_base_url}/api/correlation`;


export const correlationInsights = async(idToken) => {
  console.log("Id token from correlation:", idToken);
  try {
    const response = await axios.post(`${correlation_api_url}/insights`, {},
      { 
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("correlation_api_url", correlation_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
