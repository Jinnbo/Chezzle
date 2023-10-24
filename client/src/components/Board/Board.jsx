import React, {Component,useState, useEffect} from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { mateService } from '../../services/mate.service';
import './Board.css';

export default function Board({
    category,
    start, 
    setStart,
    correct,
    setCorrect, 
    setIncorrect, 
    setRating,
    forward,
    setForward,
    backward,
    setBackward
}){    

    // Game states
    const [game, setGame] = useState(new Chess());
    const [optionSquares, setOptionSquares] = useState([]);
    const [moveFrom, setMoveFrom] = useState("");
    const [correctMoves, setCorrectMoves] = useState([]);
    const [puzzles, setPuzzles] = useState([]);
    const [curPuzzleNumber,setCurPuzzleNumber] = useState(0);
    const [incorrectMoves,setIncorrectMoves] = useState(0);
    const [startState,setStartState] = useState(true);

    // Sound effects
    const moveSound = new Audio('/move.mp3');
    const captureSound = new Audio('/capture.mp3');
    const castleSound = new Audio('/castle.mp3');
    const checkSound = new Audio('/check.mp3');
    
    /****************************** Use Effect ******************************/

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
        setIncorrect(incorrectMoves);
    }, [incorrectMoves]);

    useEffect(()=>{        
        if (game.isCheckmate()){
            setTimeout(() => {
                setCorrect(correct + 1)
                alert('Complete');
                initPuzzle();
            }, 600); 
        }

    },[curPuzzleNumber])

    useEffect(()=>{
        // Get the puzzle from the database
        const getPuzzle = async () => {
            const mateIn1 = await mateService.getMateIn1();
            setPuzzles(mateIn1);
        }
        getPuzzle();

        if (start === true){
            initPuzzle();
        }
    },[start])

    useEffect(()=>{
        if (forward){
            setCurPuzzleNumber(curPuzzleNumber => curPuzzleNumber + 1);
            initPuzzle();
            setForward(false);
        }
    },[forward,curPuzzleNumber])

    useEffect(()=>{
        if (backward && curPuzzleNumber > 0){
            setCurPuzzleNumber(curPuzzleNumber => curPuzzleNumber - 1)
            initPuzzle();
            setBackward(false);
        }
    },[backward])

    /*************************************************************************/

    function initPuzzle(){
        setStartState(false);
        console.log("init puzzle " +  curPuzzleNumber)
        const randomFEN = puzzles.data[curPuzzleNumber].FEN;

        setRating(puzzles.data[curPuzzleNumber].Rating)

        // Set game to random puzzle
        const gameCopy = new Chess(randomFEN);
        game.loadPgn(gameCopy.pgn())
        setGame(gameCopy);
        
        setAutomatedMove();
    }

    const [numOfMoves, setNumOfMoves] = useState(0);
    function setAutomatedMove(){

        var correctmoves = puzzles.data[curPuzzleNumber].Moves.split(" ");
        // Make the opposing move to the puzzle
        
        const move = {
            from: correctmoves[0].slice(0,2),
            to: correctmoves[0].slice(2,4),
        }; 
        
        setCorrectMoves(correctmoves.slice(1));
        setNumOfMoves(numOfMoves => numOfMoves + 2);
        
        setTimeout(() => {
            makeAMove(move);
        }, 1200);
    } 


    function makeAMove(move) {
        try{
            const gameCopy = new Chess();
            gameCopy.load(game.fen())

            const result = gameCopy.move(move);
            setGame(gameCopy);
            
            return result; 
        } catch (e) {
            console.log(e)
        }
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
                    initPuzzle();
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
            //setNumOfMoves(numOfMoves => numOfMoves + 1)
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
            /*
            if ((moveFrom + square) !== correctMoves[0]){
                setOptionSquares({});
                setMoveFrom("");
                setTimeout(() => {
                    alert('Incorrect move');
                    setIncorrectMoves(incorrectMoves + 1)
                    setTimeout(() => {
                        initPuzzle();
                    }, 1000);
                }, 500);
                return;
            }
            */
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
            <div className='boardContainer border-2 w-[50vw]'>
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