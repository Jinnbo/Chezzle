const Puzzle = require('../models/Puzzle');

const getMateIn2 = async => {
    return Puzzle.aggregate([
        {
            $match: {Themes: {$regex: "mateIn2"}}
        },
        {
            $limit: 10  
        }
    ])
}

const getMateIn1 = async => {
    return Puzzle.aggregate([
        {
            $match: {Themes: {$regex: "mateIn1"}}
        },
        {
            $limit: 10  
        }
    ])
}



export const mateService = {
    getMateIn2,
    getMateIn1
}