
import axios from "axios";


const MATCH_URL = 'http://localhost:5000/lostfound/match';


export const saveMatchItem=(matchItem)=>{
    return axios.post(MATCH_URL, matchItem, 
        { withCredentials: true }
    ); 
}

export const getAllMatchItem=()=>{
    return axios.get(MATCH_URL, 
        { withCredentials: true }
    ); 
}

export const getMatchedFoundItems = (lostItemId) => {
  return axios.get(`http://localhost:5000/lostfound/found-id/${lostItemId}`, {
    withCredentials: true
  });
};





