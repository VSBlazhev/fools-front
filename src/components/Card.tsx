import React, { useState } from "react";
import { TCard } from "../types/types.ts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import clsx from "clsx";

function Card({
  card,
  toggleCard,
}: {
  card: TCard;
  toggleCard: (id: string) => void;
}) {
  const currentPlayer = useSelector(
    (state: RootState) => state.gameState.currentPlayer,
  );
  const userId = useSelector((state: RootState) => state.userState.id);
  const isAllActions = useSelector(
    (state: RootState) => state.gameState.isAllActions,
  );
  const ableToPlay = currentPlayer === userId && isAllActions;

  const [selected, setSelected] = useState(false);

  function handleClick(card: TCard) {
    if (!ableToPlay) {
      return;
    }
    setSelected(!selected);
    toggleCard(card.id);
  }

  return (
    <>
      <div
        onClick={() => handleClick(card)}
        className={clsx("flex flex-col w-36 h-36 border-4 cursor-pointer", {
          "border-emerald-500": selected,
        })}
      >
        <span>{card.id}</span>
        <span>{card.rank}</span>

        {selected ? <p className={"mt-3"}>selected</p> : null}
      </div>
    </>
  );
}

export default Card;
