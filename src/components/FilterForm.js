import React, { useEffect, useState } from "react";
import { getGenres } from "../api/tmdb";

function FilterForm({ onSubmit, onSubmitted }) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedDecade, setSelectedDecade] = useState("");

  const decadeLabels = [
    "20s",
    "30s",
    "40s",
    "50s",
    "60s",
    "70s",
    "80s",
    "90s",
    "2000s",
    "2010s",
    "2020s",
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGenre || !selectedDecade) return;
    await onSubmit(selectedGenre, selectedDecade);
    if (typeof onSubmitted === "function") {
      onSubmitted();
    }
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">SELECT GENRE</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name.toUpperCase()}
          </option>
        ))}
      </select>

      <select
        value={selectedDecade}
        onChange={(e) => setSelectedDecade(e.target.value)}
      >
        <option value="">SELECT DECADE</option>
        {decadeLabels.map((label) => (
          <option key={label} value={label}>
            {label.toUpperCase()}
          </option>
        ))}
      </select>

      <button type="submit">🔮 Reveal My Movie</button>
    </form>
  );
}

export default FilterForm;
