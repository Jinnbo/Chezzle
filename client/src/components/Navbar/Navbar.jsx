import React, {Component,useState, useEffect} from 'react';
import './Navbar.css'

export default function Navbar({setHelp, help}){

    const onButtonClick = () => {
        setHelp(true);
    } 

    return (
        <>
            <div className='navContainer flex justify-between p-[1rem] pl-[2rem] pr-[2rem] bg-black gap-[0.5rem]'>

                <div className="flex">
                    <div>
                        <img src='./logo.png' className='h-[3rem] w-[3rem]'/>
                    </div>
                    <div className='text-white text-[2rem] font-bold'>
                        Chezzle
                    </div>
                </div>

                <div onClick={()=>onButtonClick()} className="help text-white text-[2rem] font-bold">
                    Help
                </div>
            </div>
        </>
    );
}