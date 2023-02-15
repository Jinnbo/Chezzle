const express = require('express');
const mongoose = require("mongoose");

const Puzzle = require('./models/Puzzle');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/puzzles/mateIn2', async (req, res) => {
    try{
        const result = await Puzzle.find(
            { Themes: {$regex: /^mate/ } }
        );
        res.send(result);
    }catch(e){
        res.status(500).send({message: e.message});
    }
});



app.listen(3000, async () => {
    mongoose.set("strictQuery",false);
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
})