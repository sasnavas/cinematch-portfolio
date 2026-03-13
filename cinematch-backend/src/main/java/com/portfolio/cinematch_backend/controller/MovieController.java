package com.portfolio.cinematch_backend.controller;

import com.portfolio.cinematch_backend.model.Movie;
import com.portfolio.cinematch_backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173") // Give permission to our React
public class MovieController {

    @Autowired
    private MovieService movieService;

    // Endpoint GET: http://localhost:8083/api/movies
    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    // Endpoint POST: http://localhost:8083/api/movies
    @PostMapping
    public Movie saveMovie(@RequestBody Movie movie) {
        return movieService.saveMovie(movie);
    }

    // Endpoint DELETE: http://localhost:8083/api/movies/{id}
    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
    }
}