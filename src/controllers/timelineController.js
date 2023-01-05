import { getPosts } from "../repositories/postRepository.js";

export async function getLast20Posts(req, res, next) {
  return res.send(await getPosts(20));
}
