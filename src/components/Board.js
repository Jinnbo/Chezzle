import React, { Component } from 'react';
import { Chessboard } from "react-chessboard";
import './Board.css'

export default function Board(){
    return (
        <div className='container'>
            <Chessboard id="BasicBoard" />
        </div>
    )
}