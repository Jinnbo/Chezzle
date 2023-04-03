import React, {Component,useState, useEffect} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { mateService } from '../services/mate.service';
import './Board.css';

/*
TODO
- Add sound effects for all moves

LOGIC

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
    const [puzzles, setPuzzles] = useState([]);
    const [curPuzzleNumber,setCurPuzzleNumber] = useState(0);

    // Sound effects
    const moveSound = new Audio('/move.mp3');
    const captureSound = new Audio('/capture.mp3');
    const castleSound = new Audio('/castle.mp3');
    const checkSound = new Audio('/check.mp3');
    
    useEffect(()=>{
        //else moveSound.play()
        if (game.isCheckmate()){
            checkSound.play();
            setCurPuzzleNumber(curPuzzleNumber => curPuzzleNumber + 1);
        } else {
            moveSound.play();
        }

    },[game])
    
    useEffect(()=>{        
        if (curPuzzleNumber > 0){
            setTimeout(() => {
                alert('Complete');
                setPuzzle();
            }, 1000); 
        }
    },[curPuzzleNumber])

    useEffect(()=>{

        // Get the puzzle from the database
        const getPuzzles = async () => {
            const data = await mateService.getMateIn1();
            setPuzzles(data);
        };
        getPuzzles();
    },[])   

    function setPuzzle(){
        const randomFEN = puzzles.data[curPuzzleNumber].FEN;
        
        // Set game to random puzzle
        const gameCopy = new Chess(randomFEN);
        game.loadPgn(gameCopy.pgn())
        setGame(gameCopy);
        
        // Make the opposing move to the puzzle
        var correctmoves = puzzles.data[curPuzzleNumber].Moves.split(" ");

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

    async function onDrop(source,target){

        try{
            var move = await makeAMove({
                from: source,
                to: target,
                promotion: 'q',
            });

            if ((source+target) !== correctMoves[0]){
                setOptionSquares({});
                setTimeout(() => {
                    alert('Incorrect move');
                    setTimeout(() => {
                        setPuzzle();
                    }, 1000);
                }, 500);
                return;
            }

        } catch(e){}

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

    function resetFirstMove(square) {
        getMoveOptions(square);
        setMoveFrom(square);
    }


    async function onSquareClick(square) {
        
        if (moveFrom === "") {
            resetFirstMove(square);
            return;
        }
        
        try{
            var move = await makeAMove({
                from: moveFrom,
                to: square,
                promotion: 'q',
            });

            if ((moveFrom+square) !== correctMoves[0]){
                setOptionSquares({});
                setTimeout(() => {
                    alert('Incorrect move');
                    setTimeout(() => {
                        setPuzzle();
                    }, 1000);
                }, 500);
                return;
            }
        } catch(e){}

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

    return (
        <>  
            <div className='progressBarContainer'>
                <div className='progressBar'>
                    <ProgressBar now={curPuzzleNumber*10} animated label={`${curPuzzleNumber*10}%` }></ProgressBar>
                </div>
            </div>
            <div className="container">
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

                <div className='BTNSContainer'>
                    <div class="startBTNContainer">
                       <button class="btn btn-primary btn-lg" onClick={setPuzzle}> Start </button>
                    </div>
                </div>
            </div>
        </>
    );
}
