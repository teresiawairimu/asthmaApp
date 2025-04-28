import axios from "axios";
import { api_base_url } from "./apiConfig";

const mood_api_url = `${api_base_url}/api/mood`;


export const logMood = async(moodData, idToken) => {
  console.log("logging mood data", moodData);
  console.log("Id token:", idToken);
  try {
    const response = await axios.post(`${mood_api_url}/log`, moodData,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("mood_api_url", mood_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


export const retrieveMoodByDate = async (selectedDate, idToken) => {
  console.log("retrieve date", selectedDate);
  console.log("id token", idToken);
  try {
    const response = await axios.get(`${mood_api_url}/?retrieve_date=${selectedDate}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("mood_api_url", mood_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};



export const moodStats = async(idToken, range = "default") => {
  console.log("Id token from stats:", idToken);
  try {
    const response = await axios.get(`${mood_api_url}/stats/${range}`,
      { 
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("mood_api_url", mood_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const getMoodByCurrentMonth = async(idToken, range = "default") => {
  console.log("Id token from current month:", idToken);
  try {
    const response = await axios.get(`${mood_api_url}/calender/${range}`,
      { 
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("mood_api_url", mood_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


export const updateMood = async(mood_id, moodData, idToken) => {
  console.log("loging mood data", moodData);
  console.log("Id token:", idToken);
  console.log("mood_id:", mood_id);
  try {
    const response = await axios.put(`${mood_api_url}/${mood_id}`, moodData,
      {
        
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },        
      }   
    );
    console.log("mood_api_url", mood_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};