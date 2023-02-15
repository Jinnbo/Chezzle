import React, {Component,useState} from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import './Board.css';
import { mateService } from '../services/mate.service';

export default function Board(){

    const [game, setGame] = useState(new Chess());

    function makeAMove(move) {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn())

        const result = gameCopy.move(move);
        setGame(gameCopy);

        return result; 
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
