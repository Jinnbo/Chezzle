const mongoose = require('mongoose')

const puzzleSchema = new mongoose.Schema({
    FEN: String,
    moves: String,
    ratings: String,
    themes: String,
    opening: String
})

module.exports = mongoose.model("Puzzles", puzzleSchema)