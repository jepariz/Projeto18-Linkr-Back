import { getPostById } from "../repositories/postRepository.js";

export default async function (req, res, next) {
  const { id } = req.params;
  const post = await getPostById(id);

  if (post.user_id === res.locals.user.id) return next();

  return res.sendStatus(401);
}
