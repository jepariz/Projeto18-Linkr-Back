import {
  deletePostById,
  updatePostById,
} from "../repositories/postRepository.js";

export async function updatePost(req, res, next) {
  const { id } = req.params;
  const { comment } = req.body;
  const update = await updatePostById({ id, comment });
  return update ? res.sendStatus(200) : res.sendStatus(500);
}

export async function deletePost(req, res, next) {
  const { id } = req.params;
  const update = await deletePostById({ id });
  return update ? res.sendStatus(200) : res.sendStatus(500);
}
