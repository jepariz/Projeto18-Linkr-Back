import { Router } from "express";
import { postNewComment } from "../controllers/commentsControllers.js";
import jwtValidator from "../middlewares/jwtValidator.js";

const router = Router();

router.post("/comments", jwtValidator, postNewComment)

export default router;