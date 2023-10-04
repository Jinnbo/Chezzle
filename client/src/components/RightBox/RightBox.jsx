import React, {Component,useState, useEffect} from 'react';
import './RightBox.css'

export default function RightBox({category, start, setStart, correct, incorrect}){

    const onButtonClick = () => {
        setStart(!start);
    } 

    return (
        <>
            <div className='flex flex-col justify-around w-[20rem] items-center bg-black rounded-3xl'>
                <div className="text-white text-4xl font-bold">
                     {category}
                </div>

                <div className="flex justify-center items-center gap-[2rem] w-[5rem] h-[5rem]">
                    <img src='./correct.png'/>
                    <div className="correctScore text-white text-4xl">{correct}</div>
                </div>
                <div className="flex justify-center items-center gap-[2rem] w-[5rem] h-[5rem]">
                    <img src='./incorrect.png'/>
                    <div className="incorrectScore text-white text-4xl">{incorrect}</div>
                </div>

                <div className="flex justify-between w-[16rem]">
                    <img className='buttons w-[4rem] h-[2.5rem]' src='./backward.png'/>
                    <img className='buttons w-[4rem] h-[2.5rem]' src='./hint.png'/>
                    <img className='buttons w-[4rem] h-[2.5rem]' src='./forward.png'/>
                </div>

                <div onClick={()=>onButtonClick()} className="restart flex justify-center rounded-md w-[16rem] h-[2.5rem] text-[1.5rem]">
                   {start == false ? 'Start' : 'Restart'}
                </div>
            </div>
        </>
    );
}