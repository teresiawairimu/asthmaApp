import axios from "axios";
import { api_base_url } from "./apiConfig";

const asthmainfo_api_url = `${api_base_url}/api/asthmainfo`;


export const logAsthmaInfo = async(asthmaInfoData, idToken) => {
  console.log("logging asthma info data", asthmaInfoData);
  console.log("Id token:", idToken);
  try {
    const response = await axios.post(`${asthmainfo_api_url}/log`, asthmaInfoData,
      {      
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("asthmainfo_api_url", asthmainfo_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


export const getAsthmaInfo = async(idToken) => {
  console.log("Id token:", idToken);
  try {
    const response = await axios.get(`${asthmainfo_api_url}`,
      { 
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },         
      }   
    );
    console.log("asthmainfo_api_url", asthmainfo_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


export const updateAsthmaInfo = async(asthmainfo_id, asthmaInfoData, idToken) => {
  console.log("logging asthma info data", asthmaInfoData);
  console.log("Id token:", idToken);
  console.log("asthmainfo_id:", asthmainfo_id);
  try {
    const response = await axios.put(`${asthmainfo_api_url}/${asthmainfo_id}`, asthmaInfoData,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("asthmainfo_api_url", asthmainfo_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};