import axios from "axios";
import { api_base_url } from "./apiConfig";

const consent_api_url = `${api_base_url}/api/consent`;


export const logConsent = async(consentData, idToken) => {
  console.log("logging consent data", consentData);
  console.log("Id token:", idToken);
  try {
    const response = await axios.post(`${consent_api_url}/log`, consentData,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("consent_api_url", consent_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const retrieveConsent = async (idToken) => {
  console.log("id token", idToken);
  try {
    const response = await axios.get(`${consent_api_url}/`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("consent_api_url", consent_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};