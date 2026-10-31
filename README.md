# TOMC — The Online Movie Catalog

TOMC is a university web application developed for the **Web and Cloud Applications** course at the **University of Milan**. It simulates an online movie marketplace where **customers** can discover, purchase, or rent movies, while **retailers** can manage their own movie catalogs and offers.

The application provides two role-specific interfaces and combines movie discovery with storefront management and simulated transactions.

## Features

### Customer
- Browse popular, top-rated, and upcoming movies.
- Search movies by title, actor, genre, or maximum duration.
- Explore movie details, cast, trailers, and related titles.
- Manage a personal watchlist of favorite movies.
- Compare offers from different retailers and add movies to the shopping cart.
- Simulate purchases and 72-hour rentals, with a personal history of acquired titles.
- Explore retailers and submit ratings and reviews.
- Manage account information and preferred movie genres.

### Retailer
- Create and manage a retailer account and storefront.
- Discover movies and add them to the store catalog.
- Set and update purchase and rental prices, or remove listings.
- Monitor sales, rentals, revenue summaries, and active rentals.
- View customer reviews and update retailer information.

### Account Management
- Separate registration and login flows for customers and retailers.
- Role-based navigation and dashboards.
- Client-side form validation and session persistence using browser `localStorage`.

## Technologies

- **HTML5** — Page structure
- **CSS3** — Styling and responsive layouts
- **JavaScript** — Application logic and UI interactions
- **Browser localStorage** — Client-side persistence of demo accounts, storefront data, and transactions
- **Movie data API / local mock data** — Movie catalog, cast, and metadata, depending on the configured mode

## Project Structure

The repository contains the website source code, styles, scripts, and local image assets. The exact directories reflect the original implementation.

## Documentation

The full project report and interface walkthrough are available in the [Project Presentation](docs/TOMC.pdf).

## Running the Project

This is a client-side web application. Open the project's entry-point HTML page in a browser, preferably through a local development server (for example, the **Live Server** extension in Visual Studio Code).

## Acknowledgments

Movie information, posters, and cast data are provided by [The Movie Database (TMDB)](https://www.themoviedb.org).
This product uses the TMDB API but is not endorsed or certified by TMDB.

> **Note:** TOMC is an academic prototype. Accounts and transactions are simulated in the browser; it does not process real payments or provide production-grade authentication and persistent server-side storage.

## Academic Context

Developed as a university project for the **Web and Cloud Applications** course at the University of Milan.