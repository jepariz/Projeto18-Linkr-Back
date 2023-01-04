import { Router } from "express";
import { signUp } from "../controllers/usersControllers.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import userSchema from "../models/userSchema.js";
userSchema

const router = Router();

router.post("/signup", validateSchema(userSchema), signUp)

export default router;


