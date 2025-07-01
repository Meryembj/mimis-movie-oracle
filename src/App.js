import React, { useState } from "react";
import RandomButtons from "./components/RandomButtons";
import FilterForm from "./components/FilterForm";
import MovieDisplay from "./components/MovieDisplay";
import { getFilteredMovie, getRandomMovie } from "./api/tmdb";
import "./App.css";

const decades = {
  "20's": { gte: "1920-01-01", lte: "1929-12-31" },
  "30's": { gte: "1930-01-01", lte: "1939-12-31" },
  "40's": { gte: "1940-01-01", lte: "1949-12-31" },
  "50's": { gte: "1950-01-01", lte: "1959-12-31" },
  "60's'": { gte: "1960-01-01", lte: "1969-12-31" },
  "70's": { gte: "1970-01-01", lte: "1979-12-31" },
  "80's": { gte: "1980-01-01", lte: "1989-12-31" },
  "90's": { gte: "1990-01-01", lte: "1999-12-31" },
  "2000's": { gte: "2000-01-01", lte: "2009-12-31" },
  "2010's": { gte: "2010-01-01", lte: "2019-12-31" },
  "2020's": { gte: "2020-01-01", lte: "2029-12-31" },
};

function App() {
  const [movie, setMovie] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasClickedCrystal, setHasClickedCrystal] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  if (!hasClickedCrystal) {
    return (
      <div
        className="crystal-ball-wrapper"
        onClick={() => setHasClickedCrystal(true)}
      >
        <div className="crystal-ball"></div>
        <p className="crystal-text">Click the crystal to begin</p>

        {/* Add some sparkle elements */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>🔮 Mimi's Movie Randomizer 🔮</h1>
      <p className="tagline">
        Let the universe and Mimi’s TMDB magic algorithm choose your movie.
      </p>
      <div className="app-background">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="button-container">
        <button
          onClick={async () => {
            setIsLoading(true);
            setHasSearched(true);
            setMovie(null);
            const movie = await getRandomMovie();
            setMovie(movie);
            setIsLoading(false);
          }}
        >
          🔮 Totally Random Movie
        </button>

        <button onClick={toggleFilters}>🔮 Random With Filters</button>
      </div>

      {showFilters && (
        <div className="filter-container">
          <FilterForm
            onSubmitted={() => setShowFilters(false)}
            onSubmit={async (genre, decadeKey) => {
              setIsLoading(true);
              setHasSearched(true);
              setMovie(null);
              const range = decades[decadeKey];
              const movie = await getFilteredMovie(genre, range);
              setMovie(movie);
              setIsLoading(false);
            }}
          />
        </div>
      )}

      {movie && !isLoading && (
        <div className="movie-display">
          <MovieDisplay movie={movie} />
        </div>
      )}

      {hasSearched && !isLoading && movie === null && (
        <p className="no-movie-message">
          ✨ The universe found no movie for this combination. Try again! ✨
        </p>
      )}
    </div>
  );
}

export default App;
