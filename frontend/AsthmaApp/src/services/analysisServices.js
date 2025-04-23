import axios from "axios";
import { api_base_url } from "./apiConfig";

const analysis_api_url = `${api_base_url}/api/analysis`;


export const symptomsSeverityAnalysis = async(idToken, range = "default") => {
  console.log("Id token from analysis:", idToken);
  try {
    const response = await axios.post(`${analysis_api_url}/severity/${range}`, {},
      { 
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("analysis_api_url", analysis_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
