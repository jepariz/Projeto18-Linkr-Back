import { Router } from "express";

const router = Router();

router.post("/like", likePost);
router.get("/listLikes", listLikes);

export default router;