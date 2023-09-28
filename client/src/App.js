import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";
import LeftBox from "./components/LeftBox/LeftBox";
import RightBox from "./components/RightBox/RightBox";
import { useState } from "react";
import './global.css'

function App() {

  return (
    <>
      <div className="appContainer">
        <Navbar/>
        <div className="flex justify-around mt-[4rem]">
          <LeftBox/>
          <Board/>
          <RightBox/>
        </div>
      </div>  
    </>
  );
}

export default App;
