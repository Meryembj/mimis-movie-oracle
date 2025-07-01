import React from "react";

function generateShootingStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 5}s`,
      duration: 2 + Math.random() * 2 + "s",
    });
  }
  return stars;
}

export default function ShootingStars() {
  const shootingStars = generateShootingStars(5);

  return (
    <>
      {shootingStars.map((star, idx) => (
        <div
          key={idx}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </>
  );
}
