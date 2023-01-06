import { Router } from "express";
import { postsByHashtag, trending } from "../controllers/hashtagControllers.js";
import jwtValidator from "../middlewares/jwtValidator.js";

const router = Router();

router.get("/trending", trending);
router.get("/hashtag/:hashtag", jwtValidator, postsByHashtag);

export default router;
