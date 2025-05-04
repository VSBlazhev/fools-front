import React, { useContext, useEffect, useState } from "react";
import { socket, WebSocketContext } from "../contexts/WebScoket.ts";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";
import { setGame } from "../slices/appStateSlice.ts";
import { toggleReady } from "../slices/userStateSlice.ts";
import { setUserReady, setUsers } from "../slices/roomStateSlice.ts";
import CountdownTimer from "./CountdownTimer.tsx";
import { data } from "autoprefixer";
import { useSocketActions } from "../hooks/useSocketActions.ts";

export type Player = { username: string; ready: boolean };

function Room() {
  const userInfo = useSelector((state: RootState) => state.userState);

  const userState = useSelector((state: RootState) => state.userState.ready);
  const roomId = useSelector((state: RootState) => state.userState.room);
  const clients = useSelector((state: RootState) => state.roomState.users);
  const appState = useSelector((state: RootState) => state.appState.value);

  const dispatch = useDispatch();

  const socket = useContext(WebSocketContext);

  const players = Object.entries(clients);

  const [timer, setTimer] = useState(false);

  const { emitToggleReady } = useSocketActions();

  function handleReady() {
    dispatch(toggleReady());
    emitToggleReady({ roomName: roomId as string, ready: !userState });
  }

  useEffect(() => {
    socket.on("roomJoined", (data) => {
      dispatch(setUsers(data.clients));
    });
    socket.on("playerStatus", (data) => {
      dispatch(setUserReady(data));
    });

    socket.on("timer", (data) => {
      console.log(data);
      setTimer(true);
    });

    socket.on("abortTimer", (data) => {
      console.log(data);
      setTimer(false);
    });

    socket.on("gameReady", () => {
      dispatch(setGame());
    });

    socket.on("roomLeft", (data) => {
      dispatch(setUsers(data.clients));
    });

    window.addEventListener("beforeunload", () => {
      socket.emit("leaveRoom", { roomName: roomId });
    });

    return () => {
      socket.off("roomJoined");
    };
  }, []);

  return (
    <div>
      <span>Welcome to the Room</span>

      {timer ? <CountdownTimer initialTime={5} /> : null}
      <div className={"flex gap-4"}>
        {players.map((player) => (
          <div
            key={player[0]}
            className={"flex flex-col items-center justify-between border-4"}
          >
            <span>Username: {player[0]}</span>
            <span>Ready: {player[1].ready.toString()}</span>

            {player[0] === userInfo.id ? <span>Thats you</span> : null}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleReady}>Ready ??</button>
        <span>{userState ? "true" : "false"}</span>
      </div>
    </div>
  );
}

export default Room;
