import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCardToSupabase } from "../store/store";
import Card from "./Card";

function List({ list }) {
  const [cardText, setCardText] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (cardText.trim()) {
      dispatch(addCardToSupabase({ listId: list.id, cardText }));
      setCardText("");
      setInputVisible(false);
    }
  };

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className="list">
      <h3>{list.title}</h3>
      <div className="card-container">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      {isInputVisible && (
        <div className="input-container">
          <input
            type="text"
            value={cardText}
            onChange={(e) => setCardText(e.target.value)}
            placeholder="Enter card text"
            className="card-input"
          />
          <button className="submit-card" onClick={handleAddCard}>
            Submit
          </button>
        </div>
      )}
      <button className="add-card" onClick={toggleInputVisibility}>
        {isInputVisible ? "Cancel" : "Add Card"}
      </button>
    </div>
  );
}

export default List;
