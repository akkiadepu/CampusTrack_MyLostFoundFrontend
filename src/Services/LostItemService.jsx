
import axios from 'axios';

const LOST_URL = 'http://localhost:5000/lostfound/lost';
const ID_URL = 'http://localhost:5000/lostfound/lost-id';
const USR_URL = 'http://localhost:5000/lostfound/lost-user';
const U_URL = "http://localhost:5000/lostfound/lost/user";
// const LOST_USER_ACTIVE_URL = 'http://localhost:5000/lostfound/lost/student/active';


export const saveLostItem = (lostItem) => { 
    return axios.post(LOST_URL, lostItem, 
        { withCredentials: true }
    ); 
};

export const getAllLostItems=()=> { 
    return axios.get(LOST_URL, 
        { withCredentials: true }
    ); 
}

// export const getActiveLostItemsByUser = () => {
//   return axios.get(LOST_USER_ACTIVE_URL, {
//     withCredentials: true
//   });
// };


export const getLostItemById=(id)=> { 
    return axios.get(`${LOST_URL}/${id}`, 
        { withCredentials: true }
    ); 
}

export const deleteLostItemById=(id)=> { 
    return axios.delete(`${LOST_URL}/${id}`, 
        { withCredentials: true }
    ); 
}

export const updateLostItem=(lostItem)=> { 
    return axios.put(LOST_URL, lostItem, 
        { withCredentials: true }
    ); 
}

export const generateId=()=> { 
    return axios.get(ID_URL, 
        { withCredentials: true }
    ); 
}

// export const getLostItemsByUsername=()=>{ 
//     return axios.get(USR_URL, 
//         { withCredentials: true }
//     ); 
// }

export const getLostItemsByUsername=()=>{ 
 const username = sessionStorage.getItem("username");

    return axios.get(`${U_URL}/${username}`, {
        withCredentials: true
    });
};


