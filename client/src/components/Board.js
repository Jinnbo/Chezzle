import React, {Component,useState} from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { mateService } from '../services/mate.service';
import './Board.css';

export default function Board(){

    const [game, setGame] = useState(new Chess());
    const [optionSquares, setOptionSquares] = useState([]);
    const [moveFrom, setMoveFrom] = useState("");
    
    async function setPuzzle(){
        const puzzle = await mateService.getMateIn1();
        const randomNumber = Math.floor(Math.random()*puzzle.data.length);
        const randomFEN = puzzle.data[randomNumber].FEN;
        setGame(new Chess(randomFEN));
        console.log(puzzle.data[randomNumber].Moves);
    }

    function makeAMove(move) {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn())

        const result = gameCopy.move(move);
        setGame(gameCopy);

        return result; 
    }

    function resetFirstMove(square) {
        setMoveFrom(square);
        getMoveOptions(square);
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

        if (move === undefined) {
            resetFirstMove(source);
            return;
        }
        else{
            setMoveFrom("");
            setOptionSquares({});
            return true;
        }
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
            <div class="randomBTNContainer">
               <button class="btn btn-primary btn-lg" onClick={setPuzzle}> Random Puzzle </button>
            </div>
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
