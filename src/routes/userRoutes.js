import { Router } from "express";
import { getUserPosts, getUserId } from "../controllers/userController.js";
import jwtValidator from "../middlewares/jwtValidator.js";

const router = Router();

router.get("/user/:id", jwtValidator, getUserPosts);
router.get("/user", jwtValidator, getUserId);

export default router;
