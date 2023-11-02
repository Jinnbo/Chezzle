import React, { useEffect, useState } from 'react';
import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";
import LeftBox from "./components/LeftBox/LeftBox";
import RightBox from "./components/RightBox/RightBox";
import useWindowDimensions from '../src/Modules/WindowDimension'
import './global.css'


function App() {

  const {height, width} = useWindowDimensions()

  useEffect(()=>{
    document.title = "Chezzle"
  },[])

  const [category, setCategory] = useState("Mate in 1");
  const [start, setStart] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [rating, setRating] = useState(0);
  const [forward, setForward] = useState(false);
  const [backward, setBackward] = useState(false);

  return (
    <>
      <div className="appContainer">
        <Navbar/>
        {/* <div className="">
          height: {height} <br/>
          width: {width}
        </div> */}
        <div className="flex justify-around mt-[4rem]">
          <Board 
            category={category} 
            start={start} 
            setStart={setStart} 
            correct={correct}
            setCorrect={setCorrect}
            setIncorrect={setIncorrect} 
            setRating={setRating}
            forward={forward}
            setForward={setForward}

            backward={backward}
            setBackward={setBackward}
          />
          
          <RightBox 
            category={category} 
            start={start} 
            setStart={setStart} 
            correct={correct} 
            incorrect={incorrect} 
            rating={rating}
            setForward={setForward}
            setBackward={setBackward}
          /> 
        </div>
      </div>  
    </>
  );
}

export default App;
