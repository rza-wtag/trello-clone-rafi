import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./List";

function Board() {
  const lists = useSelector((state) => state.board.lists);
  const dispatch = useDispatch();

  const handleAddCard = (listId) => {
    const cardText = prompt("Enter card text");
    if (cardText) {
      dispatch(addCard({ listId, cardText }));
    }
  };

  return (
    <div className="board">
      <h2>My Trello board</h2>
      <div className="lists">
        {lists.map((list) => (
          <List
            key={list.id}
            title={list.title}
            cards={list.cards}
            onAddCard={() => handleAddCard(list.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
