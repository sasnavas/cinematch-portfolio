# 🍿 CineMatch - Full-Stack Movie Discovery

A Tinder-style web application to discover trending movies and build a personalized favorites collection. Built with a modern React frontend, a robust Java Spring Boot backend, and real-time data from the TMDB API.
  

## 🛠️ Tech Stack

* **Frontend:** React (Vite), React Router, Axios, Custom CSS (Dark/Netflix Theme)
* **Backend:** Java 17, Spring Boot, Spring Data JPA, RESTful APIs
* **Database:** PostgreSQL
* **External Integration:** TMDB (The Movie Database) API
* **DevOps:** Docker & Docker Compose (Multi-container architecture)

## ✨ Key Features

* **Interactive Swipe UI:** A smooth, Tinder-style card deck to discover popular movies. Swipe right to save, left to skip.
* **Real-Time API Consumption:** Fetches live trending data, posters, and synopses directly from TMDB.
* **Full-Stack CRUD:** Seamlessly save (POST), view (GET), and remove (DELETE) favorite movies from a persistent PostgreSQL database.
* **Modern UX/UI:** Features skeleton loading states, toast notifications, dynamic routing, and a responsive grid layout.
* **Fully Containerized:** Easy to deploy and run locally using Docker Compose.

---

## 🚀 Quick Start (Recommended)

Run the entire Full-Stack application (Database, Backend, and Frontend) with a single command using Docker.

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
* A free API key from [TMDB](https://www.themoviedb.org/).

### Steps
1. Clone this repository:
   ```bash
   git clone [https://github.com/YOUR-USERNAME/cinematch-portfolio.git](https://github.com/YOUR-USERNAME/cinematch-portfolio.git)
   cd cinematch-portfolio