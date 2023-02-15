import mongoose from 'mongoose'

const puzzleSchema = new mongoose.Schema({
    PuzzleId: String,
    FEN: String,
    Moves: String,
    Rating: String,
    RatingDeviation: String,
    Popularity: String,
    NbPlays: String,
    Themes: String,
    GameUrl: String,
    OpeningFamily: String,
    OpeningVariation: String
})

export default mongoose.model("Puzzles", puzzleSchema)




