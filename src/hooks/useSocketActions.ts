import { useCallback, useContext } from "react";
import { socket, WebSocketContext } from "../contexts/WebScoket.ts";
import { toggleReady } from "../slices/userStateSlice.ts";
import Card from "../components/Card.tsx";
import { TCard } from "../types/types.ts";
import card from "../components/Card.tsx";

export const useSocketActions = () => {
  const socket = useContext(WebSocketContext);

  const emitQuickGame = useCallback(() => {
    socket.emit("quickGame");
  }, [socket]);

  const emitToggleReady = useCallback(
    ({ roomName, ready }: { roomName: string; ready: boolean }) => {
      socket.emit("toggleReady", { roomName: roomName, ready: ready });
    },
    [socket],
  );

  const emitPlayCards = useCallback(
    ({
      roomName,
      playerId,
      cards,
    }: {
      roomName: string;
      playerId: string;
      cards: TCard[];
    }) => {
      socket.emit("playCards", {
        roomName: roomName,
        playerId: playerId,
        cards: cards,
      });
    },
    [socket],
  );

  const emitVerify = useCallback(
    ({
      roomName,
      playerId,
      action,
      cardId,
    }: {
      roomName: string;
      playerId: string;
      action: boolean;
      cardId: string;
    }) => {
      socket.emit("verifyPlayedCards", {
        roomName: roomName,
        playerId: playerId,
        action: action,
        cardId: cardId,
      });
    },
    [socket],
  );

  const emitPullTheTrigger = useCallback(
    ({ roomName, playerId }: { roomName: string; playerId: string }) => {
      socket.emit("pullTheTrigger", { roomName: roomName, playerId: playerId });
    },
    [socket],
  );

  const emitNextRound = useCallback(
    ({ roomName }: { roomName: string }) => {
      socket.emit("nextRound", { roomName: roomName });
    },
    [socket],
  );

  // const joinRoom = useCallback((roomId: string, userId: string) => {
  //     socket.emit('joinRoom', {roomId, userId});
  // }, [socket]);

  // const playCard = useCallback((cardId: string) => {
  //     socket.emit('playCard', {cardId});
  // }, [socket]);

  return {
    emitQuickGame,
    emitToggleReady,
    emitPlayCards,
    emitVerify,
    emitPullTheTrigger,
    emitNextRound,
  };
};
