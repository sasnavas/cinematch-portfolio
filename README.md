# 🍿 CineMatch - Full-Stack Movie Discovery

A Tinder-style web application to discover trending movies and build a personalized favorites collection. Built with a modern React frontend, a robust Java Spring Boot backend, and real-time data from the TMDB API.

*(Insert a screenshot or GIF of your Swipe feature here!)*

## 🛠️ Tech Stack

* **Frontend:** React (Vite), React Router, Axios, Custom CSS (Dark/Netflix Theme)
* **Backend:** Java, Spring Boot, Spring Data JPA, RESTful APIs
* **Database:** PostgreSQL
* **External Integration:** TMDB (The Movie Database) API

## ✨ Key Features

* **Interactive Swipe UI:** A smooth, Tinder-style card deck to discover popular movies. Swipe right to save, left to skip.
* **Real-Time API Consumption:** Fetches live trending data, posters, and synopses directly from TMDB.
* **Full-Stack CRUD:** Seamlessly save (POST), view (GET), and remove (DELETE) favorite movies from a persistent PostgreSQL database.
* **Modern UX/UI:** Features skeleton loading states, toast notifications, dynamic routing, and a responsive grid layout.

## ⚙️ How to Run Locally

### 1. Database Setup
* Ensure PostgreSQL is installed and running.
* Create an empty database named `cinematch_db`.

### 2. Backend Setup (Java Spring Boot)
1. Navigate to the backend directory: `cd cinematch-backend`
2. Update the database credentials in `src/main/resources/application.properties` if your local PostgreSQL uses a different username/password.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run