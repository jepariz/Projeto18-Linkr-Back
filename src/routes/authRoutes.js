import { Router } from "express";
import { login, signUp } from "../controllers/authControllers.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import loginSchema from "../models/loginSchema.js";
import userSchema from "../models/userSchema.js";

const router = Router();

router.post("/signup", validateSchema(userSchema), signUp)
router.post("/login", validateSchema(loginSchema), login)

export default router;


