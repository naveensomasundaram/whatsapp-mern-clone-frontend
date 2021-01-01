import axios from 'axios';

const instance = axios.create({
    // baseURL: "http://localhost:9000"
    baseURL: "http://whatsapp-mern-node.herokuapp.com"
});

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Headers"] = "*";

export default instance;