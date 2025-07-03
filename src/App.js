import React, { useState } from "react";
//import RandomButtons from "./components/RandomButtons";
import FilterForm from "./components/FilterForm";
//import MovieDisplay from "./components/MovieDisplay";
import { getFilteredMovie, getRandomMovie } from "./api/tmdb";
import ShootingStars from "./components/ShootingStars";
import { Analytics } from "@vercel/analytics/react";
import TarotMovieCard from "./components/Tarot/TarotMovieCard";

import "./components/Tarot/TarotMovieCard.css";
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

// Helper function to generate random positions with animation delays
function generateRandomPositions(count) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 5}s`,
    });
  }
  return positions;
}

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

  const stars = generateRandomPositions(50);

  return (
    <div className="App">
      <div
        className="header-container"
        style={{ position: "relative", overflow: "visible" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: "0 0 8px white",
                animation: "twinkle 2s infinite ease-in-out",
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        <ShootingStars />

        <h1 style={{ position: "relative", zIndex: 1 }}>
          🔮 Mimi's Movie Oracle 🔮
        </h1>
        <p className="tagline" style={{ position: "relative", zIndex: 1 }}>
          Let the universe reveal your tarot card… and the movie it chooses for
          you.{" "}
        </p>
      </div>

      <div className="app-background">
        {stars.map((pos, idx) => (
          <div
            key={`star-${idx}`}
            className="star"
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: pos.animationDelay,
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
          🃏 Totally Random Movie 🃏
        </button>
        <button onClick={toggleFilters}>🃏 Random With Filters 🃏</button>
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
      <div className="tarot-result">
        {!isLoading && movie && <TarotMovieCard movie={movie} />}
      </div>
      <Analytics></Analytics>
      {hasSearched && !isLoading && movie === null && (
        <p className="no-movie-message">
          ✨ The universe found no movie for this combination. Try again! ✨
        </p>
      )}
    </div>
  );
}

export default App;
