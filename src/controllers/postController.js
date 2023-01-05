import { likePost, unlikePost } from "../repositories/postRepository.js";

export async function likePost(req, res) {
  const { postId, userId, isLiked } = req.body;

  try {
    if (isLiked) {
      await likePost(postId, userId);
      return res.sendStatus(201);
    } else {
      await unlikePost(postId, userId);
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.send(error).status(500);
  }
}