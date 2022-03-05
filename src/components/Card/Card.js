import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { actions, useBoardStore } from "../../context/board";
import "./Card.css";

// GENERAL VARIABLES
const dragClass = "drag";
const emptyImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

// GENERAL FUNCTIONS
const moveCard = (card, top, left) => {
  card.style.top = `${top}px`;
  card.style.left = `${left}px`;
};

const resetCard = (card) => {
  card.style.removeProperty("top");
  card.style.removeProperty("left");
};

export const Card = ({ name = "card" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const { state, dispatch } = useBoardStore();

  useEffect(() => {
    isDragging
      ? cardRef.current.style.position = "absolute"
      : cardRef.current.style.removeProperty("position");
  }, [isDragging]);

  useLayoutEffect(() => {
    if (cardRef.current && state.mouseX && state.mouseY) {
      isDragging
        ? moveCard(
            cardRef.current,
            state.mouseY - cardRef.current.clientHeight / 2,
            state.mouseX - cardRef.current.clientWidth / 2
          )
        : resetCard(cardRef.current);
    }
  }, [isDragging, state]);

  const onDragStart = (e) => {
    const image = new Image();
    image.src = emptyImage;
    setIsDragging(true);
    e.dataTransfer.setDragImage(image, 0, 0);
    dispatch({ type: actions.NODE, payload: cardRef.current });
  };

  const onDragEnd = (e) => {
    setIsDragging(false);
    //dispatch({ type: actions.NODE, payload: null });
  };

  return (
    <div
      ref={cardRef}
      draggable
      className={"card"}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <p>{name}</p>
    </div>
  );
};
