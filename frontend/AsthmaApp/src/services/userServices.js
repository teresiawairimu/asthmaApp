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
}