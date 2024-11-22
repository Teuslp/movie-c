import axios from 'axios';

// Configuração básica da API
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '45bc781d9af03dd5abfa483205fcdea7', // Substitua aqui
    language: 'pt-BR',      // Idioma
  },
});

export default api;
