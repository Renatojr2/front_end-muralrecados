import axios from 'axios';

const api = axios.create({
  baseURL: 'https://recadosapibrasil.herokuapp.com',
});

export default api;
