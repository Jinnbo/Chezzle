import { Router } from "express";
import { mateRoutes } from "./mate.routes.js";

const router = Router();

router.use("/mate", mateRoutes);


export default router;