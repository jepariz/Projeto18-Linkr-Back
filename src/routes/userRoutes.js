import { Router } from "express";
import { getUserPosts, getUserId, getUsersByName, setFollow, verifyFollow } from "../controllers/userController.js";
import jwtValidator from "../middlewares/jwtValidator.js";

const router = Router();

router.get("/user/:id", jwtValidator, getUserPosts);
router.get("/user", jwtValidator, getUserId);
router.get("/search", jwtValidator, getUsersByName);
router.get("/follow/:id", jwtValidator, verifyFollow);
router.post("/follow/:id", jwtValidator, setFollow);

export default router;
