const express = require('express');
const mongoose = require("mongoose");

const Puzzle = require('./models/Puzzle');

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/puzzles/mateIn2', async (req, res) => {
    try{
        const result = await Puzzle.aggregate([
            {
                $match: {Themes: {$regex: "mate"}}
            },
            {
                $limit: 10

            }
        ])

        res.send(result);

    }catch(e){
        res.status(500).send({message: e.message});
    }
});

app.listen(5000, async () => {
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