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
    .catch((err) => console.log(err))

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('./assets/lichessPuzzles.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        
        var count = 1;

        // Iterate through results and store it as a Puzzle
        for (var i=0;i<results.length;i++){
            const puzzle = new Puzzle({
                PuzzleId: results[i].PuzzleId,
                FEN: results[i].FEN,
                Moves: results[i].Moves,
                Rating: results[i].Rating,
                RatingDeviation: results[i].RatingDeviation,
                Popularity: results[i].Popularity,
                NbPlays: results[i].NbPlays,
                Themes: results[i].Themes,
                GameUrl: results[i].GameUrl,
                OpeningFamily: results[i].OpeningFamily,
                OpeningVariation: results[i].OpeningVariation 
            })
            await puzzle.save();
            if (i % 10000 == 0){
                console.log("Percent: " + count);
                count++;
                
            }
        }
    });



