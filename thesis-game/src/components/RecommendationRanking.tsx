import React from "react";
import "./RecommendationRanking.css"; // Import CSS for styling

function RecommendationRanking() {
  // Create an array to simulate the 10 placeholder spots
  const placeholders = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="ranking-grid">
      {placeholders.map((position) => (
        <div key={position} className="ranking-placeholder">
          <div className="placeholder-content">Rank {position}</div>
        </div>
      ))}
    </div>
  );
}

export default RecommendationRanking;
