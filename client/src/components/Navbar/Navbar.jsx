import React, {Component,useState, useEffect} from 'react';
import './Navbar.css'

export default function Navbar(){
    return (
        <>
            <div className='navContainer flex p-[1rem] bg-black gap-[0.5rem]'>
                <div>
                    <img src='./logo.png' className='h-[3rem] w-[3rem]'/>
                </div>
                <div className='text-white text-[2rem] font-bold'>
                    Chezzle
                </div>
            </div>
        
        </>
    );
}