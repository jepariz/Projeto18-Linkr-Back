import { Router } from "express";
import { updatePost, deletePost } from "../controllers/postController.js";
import jwtValidator from "../middlewares/jwtValidator.js";
import idFromUserValidator from "../middlewares/idFromUserValidator.js";

const router = Router();

router.put("/post/:id", jwtValidator, idFromUserValidator, updatePost);
router.delete("/post/:id", jwtValidator, idFromUserValidator, deletePost);

export default router;
