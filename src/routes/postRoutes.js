import { Router } from "express";
import {
  updatePost,
  deletePost,
  likePostController,
  unlikePostController,
  isLiked,
  likesList,
  repostPost,
} from "../controllers/postController.js";
import jwtValidator from "../middlewares/jwtValidator.js";
import idFromUserValidator from "../middlewares/idFromUserValidator.js";
import { json } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import commentSchema from "../models/commentSchema.js";

const router = Router();
router.use(json());

router.put(
  "/post/:id",
  jwtValidator,
  idFromUserValidator,
  validateSchema(commentSchema),
  updatePost
);
router.delete("/post/:id", jwtValidator, idFromUserValidator, deletePost);
router.post("/repost/:id", jwtValidator, repostPost);
router.post("/like", jwtValidator, likePostController);
router.delete("/unlike/:id", jwtValidator, unlikePostController);
router.get("/isLiked/:id", jwtValidator, isLiked);
router.get("/likeList/:postId", jwtValidator, likesList);

export default router;
