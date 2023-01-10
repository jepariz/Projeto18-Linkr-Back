import { getPostsByUserId } from "../repositories/postRepository.js";

export async function getUserPosts(req, res, next) {
  try {
    const { error, posts } = await getPostsByUserId(req.params.id);

    if (error) return res.sendStatus(500);

    return res.send(posts);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getUserId(req, res, next) {
  return res.send(res.locals.user);
}
