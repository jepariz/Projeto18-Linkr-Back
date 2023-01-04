import { Router } from "express";
import { getLast20Posts } from "../controllers/timelineController.js";
import jwtValidator from "../middlewares/jwtValidator.js";

const router = Router();

router.get("/timeline", jwtValidator, getLast20Posts);

export default router;
