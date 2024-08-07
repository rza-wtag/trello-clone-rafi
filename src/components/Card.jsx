import React from "react";

function Card({ card }) {
  return (
    <div className="card">
      <div className="card-title">{card.title}</div>
    </div>
  );
}

export default Card;
