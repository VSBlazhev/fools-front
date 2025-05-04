import React, {useContext, useEffect} from 'react';
import {WebSocketContext} from "../contexts/WebScoket.ts";
import {useDispatch} from "react-redux";

import {setRoom} from "../slices/appStateSlice.ts";

import {attachRoom, setUserId} from "../slices/userStateSlice.ts";
import {setUsers} from "../slices/roomStateSlice.ts";
import {useSocketActions} from "../hooks/useSocketActions.ts";

function RoomSearch() {

    const dispatch = useDispatch();

    const socket = useContext(WebSocketContext)
    const {emitQuickGame} = useSocketActions()

    useEffect(() => {

        socket.on("connect", () => {
            console.log("Connected!");
        });

        socket.on('userInfo', (data) => {
            dispatch(attachRoom(data.roomName))
            dispatch(setUserId(data.id))
        })

        socket.on('roomJoined', (data) => {
            dispatch(setRoom())
            dispatch(setUsers(data.clients))
        })

        return () => {
            socket.off('userInfo');
            socket.off('roomJoined');
        };
    }, []);


    return (
        <div>
            <button onClick={() => emitQuickGame()}>Quick game</button>
            {/*<button>Create Game</button>*/}
        </div>
    );
}

export default RoomSearch;
