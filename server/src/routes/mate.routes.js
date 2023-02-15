import { Router } from "express";
import { getMateIn1, getMateIn2, getMateIn3 } from "../controllers/mate.conroller.js";

const router = Router();

router.get("/mateIn1", getMateIn1);
router.get("/mateIn2", getMateIn2);
router.get("/mateIn3", getMateIn3)

export { router as mateRoutes};