import React, { useState } from "react";
import { TCard } from "../types/types.ts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import clsx from "clsx";

function TableCard({
  card,
  handleSelect,
  visible,
  verifyPlayedCards,
  cardToVerify,
}: {
  card: TCard;
  handleSelect: (id: string) => void;
  visible: boolean;
  verifyPlayedCards: (action: boolean) => void;
  cardToVerify: string;
}) {
  const currentPlayer = useSelector(
    (state: RootState) => state.gameState.currentPlayer,
  );

  const userId = useSelector((state: RootState) => state.userState.id);
  const ableToPlay = currentPlayer === userId;

  const selected = cardToVerify === card.id;

  function handleClick(card: TCard) {
    if (!ableToPlay) {
      return;
    }

    handleSelect(card.id);
  }

  return (
    <div className={"flex flex-col gap-4"}>
      <div
        onClick={() => handleClick(card)}
        className={clsx("flex flex-col w-36 h-36 border-4 cursor-pointer", {
          "border-emerald-500": selected,
        })}
      >
        <span>{visible ? card.id : "???"}</span>
        <span>{visible ? card.rank : "???"}</span>

        {selected ? <p className={"mt-3"}>selected</p> : null}
      </div>

      {selected ? (
        <div className={"flex mt-4 justify-between items-center"}>
          <button
            onClick={() => verifyPlayedCards(true)}
            className={"border-2 p-2"}
          >
            Truth
          </button>
          <button
            onClick={() => verifyPlayedCards(false)}
            className={"border-2 p-2"}
          >
            Lie
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default TableCard;
