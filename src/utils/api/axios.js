import axios from 'axios';
import { apiURL } from '../../constants';

axios.defaults.baseURL = apiURL;
// axios.defaults.baseURL = global.location;

// global.axios = axios;

export default axios;
