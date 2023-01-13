import { Router } from "express";
import {
  getLast10Posts,
  otherUserPosts,
  postPost,
} from "../controllers/timelineController.js";
import jwtValidator from "../middlewares/jwtValidator.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import postSchema from "../models/postSchema.js";

const router = Router();

router.get("/timeline", jwtValidator, getLast10Posts);
router.post("/post", validateSchema(postSchema), jwtValidator, postPost);
router.get("/:id/posts", jwtValidator, otherUserPosts);

export default router;
