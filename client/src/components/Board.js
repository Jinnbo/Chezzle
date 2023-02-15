import React, {Component,useState} from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import './Board.css';
import axios from "axios";

export default function Board(){

    const [game, setGame] = useState(new Chess());

    function makeAMove(move) {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn())

        const result = gameCopy.move(move);
        setGame(gameCopy);

        return result; 
    }

    function getMateIn2(){
        axios.get("http://localhost:5000/puzzles/mateIn2", {crossdomain: true
        }).then(response => {

            //const gameCopy = new Chess(response.data[4].FEN);
            //setGame(gameCopy);
        })
    }

    function onDrop(source,target){
        const move = makeAMove({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (move === null) {
            return false;
        }
        return true;
    }

    return (
        <>  
            <div className='container'>
                <Chessboard
                    position={game.fen()}
                    onPieceDrop={onDrop}
                />
            </div>
        </>
    );
}

