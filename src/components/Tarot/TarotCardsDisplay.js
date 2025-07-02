import React from "react";
import tarotImages from "./TarotCards";
import "./TarotCardsDisplay.css";

const TarotCardsDisplay = () => {
  return (
    <div className="tarot-grid">
      {tarotImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Tarot card ${index + 1}`}
          className="tarot-card-img"
        />
      ))}
    </div>
  );
};

export default TarotCardsDisplay;
