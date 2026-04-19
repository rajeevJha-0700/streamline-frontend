import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://streamline-backend-3kuo.onrender.com',        
    withCredentials: true        
});

export default instance;