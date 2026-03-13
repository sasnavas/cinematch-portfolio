import axios from 'axios';

const API_URL = 'http://localhost:8083/api/movies';

export const getSavedMovies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error connecting with Java:", error);
        return [];
    }
};
export const saveMovieToDB = async (movieData) => {
    try {
        const response = await axios.post(API_URL, movieData);
        return response.data;
    } catch (error) {
        console.error("Error guardando la película en Java:", error);
        return null;
    }
};
// NEW FUNCTION: Delete movie by its ID
export const deleteMovieFromDB = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true; // Return true if it was deleted successfully
    } catch (error) {
        console.error("Error deleting the movie:", error);
        return false;
    }
};