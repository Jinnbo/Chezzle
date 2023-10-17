import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";
import LeftBox from "./components/LeftBox/LeftBox";
import RightBox from "./components/RightBox/RightBox";
import { useState } from "react";
import './global.css'

function App() {

  const [category, setCategory] = useState("Mate in 1");
  const [start, setStart] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  return (
    <>
      <div className="appContainer">
        <Navbar/>
        <div className="flex justify-around mt-[4rem]">
          <LeftBox setCategory={setCategory}/>
          <Board category={category} start={start} setCorrect={setCorrect} setStart={setStart} setIncorrect={setIncorrect}/>
          <RightBox category={category} start={start} setStart={setStart} correct={correct} incorrect={incorrect}/>
        </div>
      </div>  
    </>
  );
}

export default App;
