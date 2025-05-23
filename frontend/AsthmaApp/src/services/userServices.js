import axios from "axios";
import { api_base_url } from "./apiConfig";

const user_api_url = `${api_base_url}/api/users`;


export const registerUser = async(userData, idToken) => {
  console.log("Registering user data", userData);
  console.log("Id token:", idToken);
  try {
    const response = await axios.post(`${user_api_url}/register`, userData,
      { 
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        }, 
      }
    );
    console.log("user_api_url", user_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


export const retrieveUser = async(idToken) => {
  console.log("Id from retrieve user :", idToken);
  try {
    const response = await axios.get(`${user_api_url}`,
      {
        
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("user_api_url", user_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving user", error?.response?.data || error.message || error);
    throw error;
  }
};


export const updateUser = async(id, data, idToken) => {
  console.log("Id from update user :", id);
  console.log("data from update user", data);
  try {
    const response = await axios.put(`${user_api_url}/${id}`, data,
      {
        
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("user_api_url", user_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user", error?.response?.data || error.message || error);
    throw error;
  }
};

export const deleteUser = async (id, idToken) => {
  console.log("Id from delete user:", id);
  
  try {
    const response = await axios.delete(`${user_api_url}/${id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("user_api_url", user_api_url);
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error?.response?.data || error.message || error);
    throw error;
  }
};
