import { Router } from "express";
import jwtValidator from "../middlewares/jwtValidator.js";
import {
  likePostController,
  unlikePostController,
  isLiked,
} from "../controllers/postController.js";
import { json } from "express";

const router = Router();

router.use(json());
router.post("/like", jwtValidator, likePostController);
router.delete("/unlike/:id", jwtValidator, unlikePostController);
router.get("/isLiked/:id", jwtValidator, isLiked);

export default router;
