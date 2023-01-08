import { Router } from "express";
import {
  updatePost,
  deletePost,
  likePostController,
  unlikePostController,
  isLiked,
  likesList
} from "../controllers/postController.js";
import jwtValidator from "../middlewares/jwtValidator.js";
import idFromUserValidator from "../middlewares/idFromUserValidator.js";
import { json } from "express";

const router = Router();
router.use(json());

router.put("/post/:id", jwtValidator, idFromUserValidator, updatePost);
router.delete("/post/:id", jwtValidator, idFromUserValidator, deletePost);

router.post("/like", jwtValidator, likePostController);
router.delete("/unlike/:id", jwtValidator, unlikePostController);
router.get("/isLiked/:id", jwtValidator, isLiked);
router.get("/likeList", jwtValidator, likesList)

export default router;
