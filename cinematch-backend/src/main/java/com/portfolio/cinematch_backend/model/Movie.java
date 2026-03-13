package com.portfolio.cinematch_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "movies")
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // the ID of the movie in the TMDB API (to search for its poster later)
    @Column(name = "tmdb_id", unique = true, nullable = false)
    private Long tmdbId;

    @Column(nullable = false)
    private String title;

    private String posterPath;

    // our personal rating from 1 to 5
    private Integer personalRating;

    // NEW COLUMNS FOR NETFLIX/TINDER DESIGN
    private String releaseDate;

    // We give it 2000 characters because synopses can be very long
    @Column(length = 2000)
    private String overview;
}