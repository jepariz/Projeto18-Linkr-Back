import { getPostById } from "../repositories/postRepository.js";

export default async function (req, res, next) {
  const { id } = req.params;
  const { error, post } = await getPostById(id);

  if (error) return res.sendStatus(401);

  if (post.user_id === res.locals.user.id) return next();

  return res.sendStatus(401);
}
