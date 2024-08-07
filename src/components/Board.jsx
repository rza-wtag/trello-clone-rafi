import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardData } from "../store/store";

function Board() {
  const lists = useSelector((state) => state.board.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardData());
  }, [dispatch]);

  return (
    <div className="board">
      <h2>My Trello board</h2>
      <div className="lists">
        {lists.map((list) => (
          <div
            key={list.id}
            className={`list ${
              list.cards.length === 0 ? "empty-list" : "non-empty-list"
            }`}
          >
            <h3>{list.title}</h3>
            <div className="card-container">
              {list.cards.map((card) => (
                <div key={card.id} className="card">
                  <div className="card-title">{card.title}</div>
                </div>
              ))}
            </div>
            <button className="add-card">Add Card</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
