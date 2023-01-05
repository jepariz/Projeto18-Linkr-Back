import { Router } from "express";
import { getUserPosts } from "../controllers/userController.js";
import jwtValidator from "../middlewares/jwtValidator.js";

const router = Router();

router.get("/user/:id", jwtValidator, getUserPosts);

export default router;
