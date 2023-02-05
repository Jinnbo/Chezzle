const express = require('express');
const app = express();
const mongoose = require("mongoose");

const Puzzle = require('./models/Puzzle')

mongoose.connect(
    'mongodb+srv://Jimmy:8dGDYmEBj7AMECoI@cluster0.tn1aa6o.mongodb.net/?retryWrites=true&w=majority',
    () => {console.log("Successfully Connected to mongoDB")}
);
