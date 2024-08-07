import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardData } from "../store/store";
import List from "./List";

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
          <List key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}

export default Board;
