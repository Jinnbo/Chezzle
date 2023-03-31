import React, {Component,useState, useEffect} from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { mateService } from '../services/mate.service';
import './Board.css';

/*
TODO
- Add sound effects for all moves
- Add the undo btn

LOGIC
- Display modal when puzzle is solved DONE

User flow
1. If the move is incorrect
2. Display modal to the user
3. Reset the puzzle

*/

export default function Board(){    

    // Game states
    const [game, setGame] = useState(new Chess());
    const [optionSquares, setOptionSquares] = useState([]);
    const [moveFrom, setMoveFrom] = useState("");
    const [correctMoves, setCorrectMoves] = useState([]);
    const [puzzle, setPuzzles] = useState([]);

    // Sound effects
    const moveSound = new Audio('/move.mp3');
    const captureSound = new Audio('/capture.mp3');
    const castleSound = new Audio('/castle.mp3');
    const checkSound = new Audio('/check.mp3');
    
    useEffect(()=>{
        //if (game.inCheck()) checkSound.play()
        //else moveSound.play()

        if (game.isCheckmate()){
            window.onload = setTimeout(function(){
                alert('Complete');
                setPuzzle();
            }, 1000); 
        }

    },[game])

    useEffect(()=>{
        // Get the puzzle from the database
        const getPuzzles = async () => {
            const puzzles = await mateService.getMateIn1();
            setPuzzles(puzzles);
        };
        getPuzzles();
    },[])   

    function setPuzzle(){

        const randomNumber = Math.floor(Math.random()*puzzle.data.length);
        const randomFEN = puzzle.data[randomNumber].FEN;

        // Set game to random puzzle
        const gameCopy = new Chess(randomFEN);
        game.loadPgn(gameCopy.pgn())
        setGame(gameCopy);

        // Make the opposing move to the puzzle
        var correctmoves = puzzle.data[randomNumber].Moves.split(" ");

        const firstMove = {
            from: correctmoves[0].slice(0,2),
            to: correctmoves[0].slice(2,4),
            promotion: 'q',
        };

        setCorrectMoves(correctmoves.slice(1));

        setTimeout(() => {
            makeAMove(firstMove)
        }, 1200);
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
        
        // Check if it is the correct move
        console.log(correctMoves);


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
        
        // Check if it is the correct move
        // If it is true then display message and reset puzzle
        
        try{
            var move = makeAMove({
                from: moveFrom,
                to: square,
                promotion: 'q',
            });
            if (checkCorectMove(square)){
                setTimeout(() => {
                    undoMove();
                    setTimeout(() => {
                        alert('Incorrect move');
                    }, 500);
                }, 500);

                return;
            } 
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

    function undoMove(){
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn())
        gameCopy.undo();
        setGame(gameCopy);
    }

    function checkCorectMove(move){
        var playerMove = moveFrom + move;
        return (playerMove == correctMoves[0] ? false : true); 
    }

    return (
        <>  
            <div className='topBTNS'>
                <div class="randomBTNContainer">
                   <button class="btn btn-primary btn-lg" onClick={setPuzzle}> Random Puzzle </button>
                </div>
                <div className="undoBTN" onClick={undoMove}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </div>
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
