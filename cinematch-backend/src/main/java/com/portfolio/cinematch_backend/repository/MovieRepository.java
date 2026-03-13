package com.portfolio.cinematch_backend.repository;

import com.portfolio.cinematch_backend.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Spring magic! Only by inheriting from JpaRepository we already have
    // methods like save(), findAll(), deleteById() for free, without writing code.
}