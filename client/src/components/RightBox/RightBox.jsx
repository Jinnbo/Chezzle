import React, {Component,useState, useEffect} from 'react';

export default function RightBox(){
    return (
        <>
            <div className='flex flex-col justify-around w-[20rem] items-center bg-black rounded-3xl'>
                <div className="">
                    Mate in 1
                </div>

                <div className="">
                    <img src='./logo.png'>
                    </img>
                </div>
            </div>
        </>
    );
}