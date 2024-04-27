import axios from 'axios';
import Cookies from 'js-cookie';
import defaultAuthConfig from 'src/configs/auth'

console.log("defaultAuthConfig.getToken()",defaultAuthConfig.getToken())
const api = axios.create({
  baseURL: 'http://localhost:5000/api/spade/'
});

export default api;
