import React, {Component,useState, useEffect} from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { mateService } from '../../services/mate.service';
import './Board.css';

export default function Board({category, start, setCorrect, setIncorrect, setStart}){    

    // Game states
    const [game, setGame] = useState(new Chess());
    const [optionSquares, setOptionSquares] = useState([]);
    const [moveFrom, setMoveFrom] = useState("");
    const [correctMoves, setCorrectMoves] = useState([]);
    const [puzzles, setPuzzles] = useState([]);
    const [curPuzzleNumber,setCurPuzzleNumber] = useState(0);
    const [incorrectMoves,setIncorrectMoves] = useState(0);
    const [startState,setStartState] = useState(true);
    const [numOfMoves, setNumOfMoves] = useState(0);

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
    
    useEffect(() => {
        setCorrect(curPuzzleNumber)
        setIncorrect(incorrectMoves)
    }, [curPuzzleNumber,incorrectMoves]);

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
            switch(category){
                case "Mate in 1":
                    const data = await mateService.getMateIn1();
                    setPuzzles(data);
                    break;
                case "Mate in 2":
                    const data2 = await mateService.getMateIn2();
                    setPuzzles(data2);
                    break;
                case "Mate in 3":
                    const data3 = await mateService.getMateIn3();
                    setPuzzles(data3);
                    break;
            }
        };
        getPuzzles();
        if (start === true){
            setPuzzle();
        }
    },[start])

    // Reset board when switching to new game mode (category)
    useEffect(()=>{
        const gameCopy = new Chess();
        setGame(gameCopy);
        setStart(false);
        setCurPuzzleNumber(0);
        setIncorrectMoves(0);
    },[category])


    function setPuzzle(){
        setStartState(false);
        const randomFEN = puzzles.data[curPuzzleNumber].FEN;
        
        // Set game to random puzzle
        const gameCopy = new Chess(randomFEN);
        game.loadPgn(gameCopy.pgn())
        setGame(gameCopy);
        
        setAutomatedMove();
    }

    function setAutomatedMove(){
        var correctmoves = puzzles.data[curPuzzleNumber].Moves.split(" ");
        // Make the opposing move to the puzzle

        const move = {
            from: correctmoves[numOfMoves].slice(0,2),
            to: correctmoves[numOfMoves].slice(2,4),
            promotion: 'q',
        };

        setCorrectMoves(correctmoves.slice(1));
        setNumOfMoves(numOfMoves => numOfMoves + 1)
        
        setTimeout(() => {
            makeAMove(move);
        }, 1200);
    } 

    useEffect(()=>{
        console.log(numOfMoves)
    },[numOfMoves])


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
                    setIncorrectMoves(incorrectMoves => incorrectMoves + 1)
                    setTimeout(() => {
                        setPuzzle();
                    }, 1000);
                }, 500);
                return;
            }

        } catch(e){}

        if (move === undefined) {
            resetFirstMove(source);
            console.log("here a")
            return;
        }
        else{
            setMoveFrom("");
            setOptionSquares({});
            setAutomatedMove();
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
                    setIncorrectMoves(incorrectMoves => incorrectMoves + 1)
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
            setAutomatedMove();
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
            <div className='boardContainer border-2 w-[35vw]'>
                <Chessboard
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    onSquareClick={onSquareClick}
                    customSquareStyles={{...optionSquares}}
                />
            </div>
        </>
    );
}


/*

            switch(category){
                case "Mate in 1":
                    const data = await mateService.getMateIn1();
                    setPuzzles(data);
                    break;
                case "Mate in 2":
                    const data2 = await mateService.getMateIn2();
                    setPuzzles(data2);
                    break;
                case "Mate in 3":
                    const data3 = await mateService.getMateIn3();
                    setPuzzles(data3);
                    break;
            }


                <div className='leftContainer'>
                    <div className='username'>
                        NAME
                    </div>
                    <div className='userIcon'>
                    </div>
                    <div className='userRank'>
                        #1
                    </div>  
                    <div className='scoreContainer'>
                        <div className='correctContainer'>
                            <img src={require('../../assets/correct.png')} className='correctIcon'></img>
                            <div className='correctScore'>{curPuzzleNumber}</div>
                        </div>
                        <div className='incorrectContainer'>
                            <img src={require('../../assets/incorrect.png')} className='incorrectIcon'></img>
                            <div className='incorrectScore'>{incorrectMoves}</div>
                        </div>
                    </div>
                    <div className='btnContainer'>
                        <button className='startBTN' onClick={setPuzzle}>{startState === true ? "Start" : "Restart"}</button>
                       
                    </div>
                </div>

*/