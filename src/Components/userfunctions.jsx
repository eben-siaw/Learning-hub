import { useRadioGroup } from "@material-ui/core";
import axios from "axios";  

const local = "http://localhost:5050/"; 

const BASE_URL = "https://nilee-nodedatabase.herokuapp.com/";

export const register = async (newuser) => 

  await axios.post(BASE_URL + "users/register", newuser); 

export const login = async (user) => {
  try {
    const { data } = await axios.post(BASE_URL + "users/login", user); 
    !data.error && localStorage.setItem("usertoken", data);
    return data;
  } catch (error) {
    return { error: error.message };
  }
}; 

export const reset = async (user) => { 

 try {
    return axios.post(BASE_URL + "/users/resetpassword");
 } catch (error) {
    return {error: error.message}
 }

}

export const newPassword = async (user) => { 

 try {
 return axios.post(BASE_URL + "/users/resetPassword", user);
 } catch (error) {
    return {error: error.message}
 }

}