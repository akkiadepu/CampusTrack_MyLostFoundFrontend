
import axios from 'axios';

const FOUND_URL = 'http://localhost:5000/lostfound/found';
const ID_URL = 'http://localhost:5000/lostfound/found-id';
const USR_URL = 'http://localhost:5000/lostfound/found-user';
const U_URL = "http://localhost:5000/lostfound/found/user";
// const FOUND_USER_ACTIVE_URL = 'http://localhost:5000/lostfound/found/user/active';

export const saveFoundItem = (foundItem) => {
    return axios.post(FOUND_URL, foundItem, {
        withCredentials: true
    });
};

export const getAllFoundItems = () => {
    return axios.get(FOUND_URL,
        {
            withCredentials: true
        });
}

// export const getActiveFoundItemsByUser = () => {
//   return axios.get(FOUND_USER_ACTIVE_URL, {
//     withCredentials: true
//   });
// };
 
export const getFoundItemById = (id) => {
    return axios.get(`${FOUND_URL}/${id}`,
        {
            withCredentials: true
        });
}

export const deleteFoundItemById = (id) => {
    return axios.delete(`${FOUND_URL}/${id}`,
        {
            withCredentials: true
        });
}

export const updateFoundItem = (lostItem) => {
    return axios.put(FOUND_URL, lostItem, {
        withCredentials: true
    });
}

export const generateId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}

// export const getFoundItemsByUsername = () => {
//     return axios.get(USR_URL, {
//         withCredentials: true
//     });
// }

export const getFoundItemsByUsername = () => {
    const username = sessionStorage.getItem("username");

    return axios.get(`${U_URL}/${username}`, {
        withCredentials: true
    });
};


export const getFoundItemByLostItem = (id) => {
    return axios.get(`${ID_URL}/${id}`, {
        withCredentials: true
    });

}

