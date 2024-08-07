import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardData, addCardToSupabase } from "../store/store";

function Board() {
  const lists = useSelector((state) => state.board.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardData());
  }, [dispatch]);

  const handleAddCard = (listId) => {
    const cardText = prompt("Enter card text");
    if (cardText) {
      dispatch(addCardToSupabase({ listId, cardText }));
    }
  };

  return (
    <div className="board">
      <h2>My Trello board</h2>
      <div className="lists">
        {lists.map((list) => (
          <div key={list.id} className="list">
            <h3>{list.title}</h3>
            <div className="card-container">
              {list.cards.map((card) => (
                <div key={card.id} className="card">
                  <div className="card-title">{card.title}</div>
                </div>
              ))}
            </div>
            <button className="add-card" onClick={() => handleAddCard(list.id)}>
              Add Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
