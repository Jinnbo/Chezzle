import React, {Component,useState, useEffect} from 'react';
import './LeftBox.css'

export default function LeftBox({setCategory}){
    
    const onButtonClick = (category) => {
        setCategory(category);
    }

    return (
        <>
            <div className='flex flex-col justify-around w-[20rem] items-center bg-black rounded-3xl'>
                <div onClick={()=>onButtonClick('Mate in 1')} className='categories flex justify-center items-center rounded-md w-[13rem] h-[2.5rem] text-[1.5rem]'>
                    Mate in 1
                </div>
                <div onClick={()=>onButtonClick('Mate in 2')} className='categories flex justify-center rounded-md w-[13rem] h-[2.5rem] text-[1.5rem]'>
                    Mate in 2
                </div>
                <div onClick={()=>onButtonClick('Mate in 3')} className='categories flex justify-center rounded-md w-[13rem] h-[2.5rem] text-[1.5rem]'>
                    Mate in 3
                </div>
                <div onClick={()=>onButtonClick('Pins')} className='categories flex justify-center rounded-md w-[13rem] h-[2.5rem] text-[1.5rem]'>
                    Pins
                </div>
                <div onClick={()=>onButtonClick('Skewers')} className='categories flex justify-center rounded-md w-[13rem] h-[2.5rem] text-[1.5rem]'> 
                    Skewers
                </div>
            </div>
        </>
    );
}