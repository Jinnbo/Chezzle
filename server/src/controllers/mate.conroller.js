import { MateService } from "../services/mate.service.js";

export const getMateIn1 = async (req, res) => {
    try {
        const mateIn1 = await MateService.getMateIn1();
        res.status(200).json(mateIn1);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const getMateIn2 = async (req, res) => {
    try {
        const mateIn2 = await MateService.getMateIn2();
        res.status(200).json(mateIn2);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const getMateIn3 = async (req, res) => {
    try {
        const mateIn3 = await MateService.getMateIn3();
        res.status(200).json(mateIn3);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}