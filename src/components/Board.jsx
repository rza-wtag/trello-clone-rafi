import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardData, addListToSupabase } from "../store/store";
import List from "./List";

function Board() {
  const lists = useSelector((state) => state.board.lists);
  const dispatch = useDispatch();
  const [listTitle, setListTitle] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchBoardData());
  }, [dispatch]);

  const handleAddList = async () => {
    if (listTitle.trim()) {
      await dispatch(addListToSupabase(listTitle));
      setListTitle("");
      setInputVisible(false);
      dispatch(fetchBoardData());
    }
  };

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className="board">
      <h2>My Trello board</h2>
      <div className="lists">
        {lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
        <div className="add-list-container">
          {isInputVisible && (
            <div className="input-container">
              <input
                type="text"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                placeholder="Enter list title..."
                className="list-input"
              />
              <button className="submit-list" onClick={handleAddList}>
                Submit
              </button>
            </div>
          )}
          <button className="add-list" onClick={toggleInputVisibility}>
            {isInputVisible ? "Cancel" : "Add List"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Board;
