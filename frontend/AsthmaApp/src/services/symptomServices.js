import axios from "axios";
import { api_base_url } from "./apiConfig";

const symptom_api_url = `${api_base_url}/api/symptom`;


export const logSymptoms = async(symptomData, idToken) => {
  console.log("loging symptom data", symptomData);
  console.log("Id token:", idToken);
  try {
    const response = await axios.post(`${symptom_api_url}/log`, symptomData,
      {
        
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("symptom_api_url", symptom_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


export const getSymptoms = async(idToken) => {
  console.log("Id token:", idToken);
  try {
    const response = await axios.get(`${symptom_api_url}/`,
      {
        
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("symptom_api_url", symptom_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


export const updateSymptoms = async(symptom_id, symptomData, idToken) => {
  console.log("loging symptom data", symptomData);
  console.log("Id token:", idToken);
  console.log("symptom_id:", symptom_id);
  try {
    const response = await axios.post(`${symptom_api_url}/log`, symptom_id, symptomData,
      {
        
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("symptom_api_url", symptom_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};