import React, { useEffect, useState } from "react";
import { socket } from "../contexts/WebScoket.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  setActions,
  setCurrentPlayer,
  setGameOver,
  setHand,
  setKonCard,
  setPlayers,
  setShoot,
  setShooterId,
  setTableCards,
} from "../slices/gameStateSlice.ts";
import { RootState } from "../store/store.ts";
import Card from "./Card.tsx";
import { TCard } from "../types/types.ts";
import { useSocketActions } from "../hooks/useSocketActions.ts";
import TableCard from "./TableCard.tsx";
import { data } from "autoprefixer";

function Game(props) {
  const {
    hand,
    players,
    isAllActions,
    currentPlayer,
    konCard,
    tableCards,
    haveToShoot,
    shooterId,
    isGameOver,
  } = useSelector((state: RootState) => state.gameState);

  const userId = useSelector(
    (state: RootState) => state.userState.id as string,
  );
  const roomId = useSelector(
    (state: RootState) => state.userState.room as string,
  );
  const isYourTurn = currentPlayer === userId;
  const shootButton = shooterId === userId && haveToShoot === true;
  const { emitPlayCards, emitVerify, emitPullTheTrigger } = useSocketActions();
  const dispatch = useDispatch();

  const [cardsToPlay, setCardsToPlay] = useState<TCard[]>([]);
  const [cardToVerify, setCardToVerify] = useState<string>("");

  const [visible, setVisible] = useState(false);

  const [result, setResult] = useState<boolean>();
  const [check, setCheck] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [shot, setShot] = useState<number>(0);

  const otherPlayers = players.filter((player) => player.id !== userId);

  function toggleCard(id: string) {
    const cardInPlay = cardsToPlay.find((card) => card.id === id);
    const cardInHand = hand.find((card) => card.id === id);
    if (cardInPlay && cardInHand) {
      return setCardsToPlay(
        cardsToPlay.filter((card: TCard) => card.id !== id),
      );
    }
    if (cardInHand) {
      return setCardsToPlay((prevState) => [...prevState, cardInHand]);
    }
  }

  function playCards() {
    emitPlayCards({ roomName: roomId, playerId: userId, cards: cardsToPlay });
    setCardsToPlay([]);
    setCardToVerify("");
  }

  function handleClickCard(card: string) {
    setCardToVerify(card);
    console.log(cardToVerify);
  }

  console.log(cardsToPlay);

  function verifyPlayedCards(action: boolean) {
    emitVerify({
      roomName: roomId,
      playerId: userId,
      action: action,
      cardId: cardToVerify,
    });
    setCardsToPlay([]);
    setCardToVerify("");
  }

  function handleTrigger() {
    setShot(shot + 1);
    emitPullTheTrigger({ roomName: roomId, playerId: userId });
  }

  useEffect(() => {
    socket.on("gameState", (data) => {
      console.log(data);
      dispatch(setKonCard(data.konCard));
      dispatch(setPlayers(data.players));
      dispatch(setCurrentPlayer(data.currentPlayerId));
      dispatch(setActions(data.isAllActions));
      dispatch(setTableCards(data.tableCards));
    });
    socket.on("hand", (data) => {
      dispatch(setHand(data));
      console.log(data);
    });

    socket.on("verifyResults", (data) => {
      setTimeout(() => {
        setVisible(true);
        setResult(data.result);
        setCheck(true);
      }, 5000);
    });

    socket.on("actionStatus", (data) => {
      dispatch(setShooterId(data.userId));
      setTimeout(() => {
        dispatch(setShoot(data.haveToShoot));
      }, 5000);

      console.log(data);
    });

    socket.on("shootResult", (data) => {
      console.log(data);
      if (!isGameOver) {
        setNextRoundScreen(true);
      }
    });

    socket.on("gameOver", (data) => {
      dispatch(setGameOver(data.gameOver));
      console.log(data);
    });

    socket.on("newRound", () => {
      setCheck(false);
      setVisible(false);

      dispatch(setShoot(false));
    });
  }, []);

  const [nextRoundScreen, setNextRoundScreen] = useState<boolean>(false);

  function handleNextRound() {
    setRound((state) => state + 1);
    setNextRoundScreen(false);
    dispatch(setShooterId(""));
  }

  console.log(shooterId);
  if (isGameOver) {
    return <span>GAME OVER</span>;
  }

  if (nextRoundScreen) {
    return (
      <span onClick={handleNextRound}>
        {shooterId} is lucky to be alive (click to next round)
      </span>
    );
  }

  return (
    <div>
      <span>This is the GAME</span>

      <div className={"flex justify-between"}>
        <div className={"flex flex-col border-2 p-2"}>
          <span>GAME DATA:</span>
          <span>Current kon card : {konCard}</span>
          <div className={"flex flex-col"}>
            {otherPlayers.map((player) => (
              <div key={player.id}>
                <span>
                  {player.id} have {player.cardsInHand} Cards
                </span>
              </div>
            ))}

            <span>Shots {shot}/6</span>
            <span>Round {round}</span>
            {/*<span>Current card</span>*/}
            {/*<span>Current player Id</span>*/}
          </div>
        </div>

        {isYourTurn ? (
          <span className={"h-fit bg-green-200"}>Its your turn</span>
        ) : null}
      </div>
      <div className={"mt-20 flex flex-col "}>
        <span>Cards to check : {tableCards.length} </span>

        {tableCards.length ? (
          <div className={"flex gap-4"}>
            {tableCards.map((card: TCard) => {
              return (
                <TableCard
                  key={card.id}
                  card={card}
                  visible={visible}
                  cardToVerify={cardToVerify}
                  verifyPlayedCards={verifyPlayedCards}
                  handleSelect={handleClickCard}
                />
              );
            })}
          </div>
        ) : null}

        {check ? (
          <span className={"mt-10"}>
            {result
              ? `${currentPlayer}You cant be fooled !`
              : `${currentPlayer} - You fool !`}
          </span>
        ) : null}

        {shootButton ? (
          <button onClick={handleTrigger}>Pull The Trigger</button>
        ) : null}
      </div>

      <div className={"flex flex-col items-center justify-between mt-20"}>
        <span>Your hand</span>
        <div className={"flex gap-4 items-center justify-between"}>
          {hand.map((card) => (
            <Card card={card} toggleCard={toggleCard} key={card.id} />
          ))}
        </div>

        {isYourTurn && isAllActions && cardsToPlay.length !== 0 ? (
          <div className={"mt-4 bg-green-200"}>
            <button onClick={() => playCards()}>Play selected cards</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Game;
