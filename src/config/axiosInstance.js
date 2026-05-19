import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://streamline-backend-9taz.onrender.com',        
    withCredentials: true        
});

export default instance;