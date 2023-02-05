const express = require('express');
const app = express();
const mongoose = require("mongoose");

const Puzzle = require('./models/Puzzle');

mongoose.set("strictQuery", false);
mongoose.connect(
    'mongodb+srv://Jimmy:8dGDYmEBj7AMECoI@cluster0.tn1aa6o.mongodb.net/Puzzles',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => console.log("A: " + err))

// Write a script that saves the lichessPuzzles and upload onto mongdoDb

/*
async function run(){
    
    const puzzle = new Puzzle({
        
        
    })
    await puzzle.save()
    console.log(puzzle )
}
*/

