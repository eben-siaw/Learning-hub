import axios from "axios";  
import jwt_decode from 'jwt-decode';
const URL = "https://nilee-nodedatabase.herokuapp.com/"


export const courseEntry = async (join) => {
  try {
    const {data} = await axios.post( URL + "/courses/join", {
      ...join,
    }); 
    return data;
  } catch (error) {
    return { error: "Internal Server Error" };
  }
}; 


