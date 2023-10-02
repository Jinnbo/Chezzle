import React, {Component,useState, useEffect} from 'react';
import './RightBox.css'

export default function RightBox(){
    return (
        <>
            <div className='flex flex-col justify-around w-[20rem] items-center bg-black rounded-3xl'>
                <div className="text-white text-4xl font-bold">
                    Mate in 1
                </div>

                <div className="flex justify-center items-center gap-[2rem] w-[5rem] h-[5rem]">
                    <img src='./correct.png'/>
                    <div className="correctScore text-white text-4xl">0</div>
                </div>
                <div className="flex justify-center items-center gap-[2rem] w-[5rem] h-[5rem]">
                    <img src='./incorrect.png'/>
                    <div className="incorrectScore text-white text-4xl">0</div>
                </div>

                <div className="flex justify-between w-[16rem]">
                    <img className='buttons w-[4rem] h-[2.5rem]' src='./backward.png'/>
                    <img className='buttons w-[4rem] h-[2.5rem]' src='./hint.png'/>
                    <img className='buttons w-[4rem] h-[2.5rem]' src='./forward.png'/>
                </div>

                <div className="restart flex justify-center rounded-md w-[16rem] h-[2.5rem] text-[1.5rem]">
                    Start
                </div>
            </div>
        </>
    );
}