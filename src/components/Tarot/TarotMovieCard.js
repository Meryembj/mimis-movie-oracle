import { useState, useEffect } from "react";
import tarotImages from "./TarotCards";

function TarotMovieCard({ movie }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardImage, setCardImage] = useState(null);
  const [hasAutoFlipped, setHasAutoFlipped] = useState(false);

  useEffect(() => {
    if (movie) {
      const randomIndex = Math.floor(Math.random() * tarotImages.length);
      setCardImage(tarotImages[randomIndex]);

      const flipTimer = setTimeout(() => {
        setIsFlipped(true);
        setHasAutoFlipped(true);
      }, 3000);

      return () => clearTimeout(flipTimer);
    }
  }, [movie]);

  if (!movie || !cardImage) return null;

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="tarot-card">
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        <div
          className="card-front"
          style={{ backgroundImage: `url(${cardImage})` }}
          onClick={toggleFlip}
        />

        <div className="card-back">
          <div className="movie-info">
            <h2
              className="tarot-title"
              onClick={toggleFlip}
              style={{ cursor: "pointer" }}
              title="Click to flip the card"
            >
              {movie.title}
            </h2>

            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="tarot-image"
              />
            </a>

            <p className="tarot-description">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarotMovieCard;
