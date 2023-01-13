import { Router } from "express";
import { getComments, postNewComment } from "../controllers/commentsControllers.js";
import jwtValidator from "../middlewares/jwtValidator.js";

const router = Router();

router.post("/comments", jwtValidator, postNewComment)
router.get("/posts/:id/comments", jwtValidator, getComments)

export default router;