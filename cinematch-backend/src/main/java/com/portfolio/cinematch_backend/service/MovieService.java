package com.portfolio.cinematch_backend.service;

import com.portfolio.cinematch_backend.model.Movie;
import com.portfolio.cinematch_backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    // Get all saved movies
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Save a new movie
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    // Delete a movie
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}