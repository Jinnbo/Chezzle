import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";
import LeftBox from "./components/LeftBox/LeftBox";
import RightBox from "./components/RightBox/RightBox";
import { useState } from "react";
import './global.css'

function App() {

  const [category, setCategory] = useState("Mate in 1");
  const [start, setStart] = useState(false);

  return (
    <>
      <div className="appContainer">
        <Navbar/>
        <div className="flex justify-around mt-[4rem]">
          <LeftBox setCategory={setCategory}/>
          <Board category={category} start={start}/>
          <RightBox category={category} start={start} setStart={setStart}/>
        </div>
      </div>  
    </>
  );
}

export default App;
