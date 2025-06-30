import React from "react";
import { getRandomMovie } from "../api/tmdb";

function RandomButtons({ setMovie }) {
  const handleClick = async () => {
    const movie = await getRandomMovie();
    setMovie(movie);
  };

  return (
    <div>
      <button onClick={handleClick}>🔮 Totally Random Movie</button>
    </div>
  );
}

export default RandomButtons;
