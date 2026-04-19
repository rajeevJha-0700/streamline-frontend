import axios from 'axios';

const instance = axios.create({
    baseURL: '',                 //we are using credentials   
    withCredentials: true        
});

export default instance;