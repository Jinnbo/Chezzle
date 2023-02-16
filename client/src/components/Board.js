import React, {Component,useState} from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import './Board.css';
import { mateService } from '../services/mate.service';


export default function Board(){

    const [game, setGame] = useState(new Chess());
    const [optionSquares, setOptionSquares] = useState([]);
    const [moveFrom, setMoveFrom] = useState("");
    
    function makeAMove(move) {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn())

        const result = gameCopy.move(move);
        setGame(gameCopy);

        return result; 
    }

    function onDrop(source,target){

        //let data = mateService.getMateIn1();
        //data.then( (res) =>{
        //    console.log(res.data[0]);
        //})

        const move = makeAMove({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (move === null) {
            //resetFirstMove(source);
            return;
        }
        else{
            return true;
        }
    }

    function resetMove(){
        setMoveFrom("");
        setOptionSquares([]);
    }

    function getMoveOptions(square) {
        const moves = game.moves({
          square,
          verbose: true,
        });

        const newSquares = {};

        if (moves.length === 0) {
            newSquares[square] = {
                background: "rgba(255, 255, 0, 0.4)",
              };
              setOptionSquares(newSquares);
          return;
        }
    
        moves.map((move) => {
          newSquares[move.to] = {
            background:
              game.get(move.to) && game.get(move.to).color !== game.get(square).color
                ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
            borderRadius: "50%",
          };
          return move;
        });
        newSquares[square] = {
          background: "rgba(255, 255, 0, 0.4)",
        };
        setOptionSquares(newSquares);
      }

    function onSquareClick(square) {

        function resetFirstMove(square) {
            setMoveFrom(square);
            getMoveOptions(square);
        }
        
        if (moveFrom === "") {
            resetFirstMove(square);
            return;
        }
        
        try{
            var move = makeAMove({
                from: moveFrom,
                to: square,
                promotion: 'q',
            });
        } catch (e) {
            console.log(move);
        }

        
        if (move === undefined) {
            resetFirstMove(square);
            return;
        }
        else{
            setMoveFrom("");
            setOptionSquares({});
            return true;
        }
    }

    return (
        <>  
            <div class='boardContainer'>
                <Chessboard
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    onSquareClick={onSquareClick}
                    customSquareStyles={{
                        ...optionSquares
                    }}
                />
            </div>
        </>
    );
}
