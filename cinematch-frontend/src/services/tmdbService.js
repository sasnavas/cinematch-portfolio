import axios from 'axios';

const TMDB_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getPopularMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${TMDB_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                language: 'es-MX',
                page,
            }
        });
        return response.data.results;
    } catch (error) {
        console.error("Error getting movies from TMDB:", error);
        return [];
    }
};