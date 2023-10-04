import Puzzle from '../models/Puzzle.js';

const getMateIn1 = async => {
    return Puzzle.aggregate([
        {
            $match: {Themes: {$regex: "mateIn1"}}
        },
        {
            $limit: 100
        }
    ])
}

const getMateIn2 = async => {
    return Puzzle.aggregate([
        {
            $match: {Themes: {$regex: "mateIn2"}}
        },
        {
            $limit: 100 
        }
    ])
}

const getMateIn3 = async => {
    return Puzzle.aggregate([
        {
            $match: {Themes: {$regex: "mateIn3"}}
        },
        {
            $limit: 100  
        }
    ])
}


export const MateService = {
    getMateIn1,
    getMateIn2,
    getMateIn3
}