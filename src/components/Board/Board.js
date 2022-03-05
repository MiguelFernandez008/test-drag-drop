import React from "react";
import { actions, useBoardStore } from "../../context/board";

export const Board = ({ children }) => {

  const {dispatch} = useBoardStore();

  const onDragOver = e => {
    e.preventDefault();
    dispatch({ type: actions.MOVE, payload: {x: e.pageX, y: e.pageY} });
  };

  return (
    <div className="Board" onDragOver={onDragOver}>
      {children}
    </div>
  );
};
