import { Router } from "express";
import {
  getLast20Posts,
  otherUserPosts,
  postPost,
} from "../controllers/timelineController.js";
import jwtValidator from "../middlewares/jwtValidator.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import postSchema from "../models/postSchema.js";

const router = Router();

router.get("/timeline", jwtValidator, getLast20Posts);
router.post("/post", validateSchema(postSchema), jwtValidator, postPost);
router.get("/:id/posts", jwtValidator, otherUserPosts);

export default router;
