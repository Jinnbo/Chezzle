import React, {Component,useState, useEffect} from 'react';
import './RightBox.css'

export default function RightBox({
    category, 
    start, 
    setStart, 
    correct, 
    incorrect, 
    rating,
    setForward,
    setBackward
}){

    const onButtonClick = () => {
        setStart(!start);
    } 
    
    const onForwardClick = () => {
        setForward(true);
    }

    const onBackwardClick = () => {
        setBackward(true);
    }

    return (
        <>
            <div className='flex flex-col justify-around w-[20rem] items-center bg-black rounded-3xl'>
                <div className="flex flex-col items-center text-white text-6xl font-bold gap-[2rem]">
                    <div className="">
                        {category}
                    </div>
                    <div className="text-3xl">
                        Rating: {rating}
                    </div>
                </div>

                <div className="flex justify-center items-center gap-[2rem] w-[5rem] h-[5rem]">
                    <img src='./correct.png'/>
                    <div className="correctScore text-white text-4xl">{correct}</div>
                </div>
                <div className="flex justify-center items-center gap-[2rem] w-[5rem] h-[5rem]">
                    <img src='./incorrect.png'/>
                    <div className="incorrectScore text-white text-4xl">{incorrect}</div>
                </div>

                        
                <div className="flex flex-col gap-[2rem]">
                    <div className="flex justify-between w-[16rem]">
                        <div onClick={()=>onBackwardClick()}>
                            <img className='buttons w-[6rem] h-[3.5rem]' src='./backward.png'/>
                        </div>
                        <div onClick={()=>onForwardClick()}>
                            <img className='buttons w-[6rem] h-[3.5rem]' src='./forward.png'/>
                        </div>
                    </div>

                    <div onClick={()=>onButtonClick()} className="restart flex justify-center items-center rounded-md w-[16rem] h-[3.5rem] text-[2rem]">
                    {start == false ? 'Start' : 'Restart'}
                    </div>
                </div>
            </div>
        </>
    );
}