import { getPostsByUserId } from "../repositories/postRepository.js";

export async function getUserPosts(req, res, next) {
  return res.send(await getPostsByUserId(req.params.id));
}
