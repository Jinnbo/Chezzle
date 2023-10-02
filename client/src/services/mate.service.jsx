import axios from "axios";

const getMateIn1 = async => {
    return axios.get("http://localhost:5000/api/mate/mateIn1", {crossdomain: true} )
}

const getMateIn2 = async => {
    return axios.get("http://localhost:5000/api/mate/mateIn2", {crossdomain: true} )
}

const getMateIn3 = async => {
    return axios.get("http://localhost:5000/api/mate/mateIn3", {crossdomain: true} )
}

export const mateService = {
    getMateIn1,
    getMateIn2,
    getMateIn3
}