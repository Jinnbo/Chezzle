import axios from "axios";

const getMateIn1 = async => {
    return axios.get("http://localhost:5000/puzzles/mateIn1", {crossdomain: true} )
}

const getMateIn2 = async => {
    return axios.get("http://localhost:5000/puzzles/mateIn2", {crossdomain: true} )
}

export const mateService = {
    getMateIn1,
    getMateIn2
}