import {
  deletePostById,
  updatePostById,
} from "../repositories/postRepository.js";
import {
  getLikesInPost,
  likePost,
  unlikePost,
  verifyIfIsLiked,
} from "../repositories/likeRepository.js";

export async function updatePost(req, res, next) {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const update = await updatePostById({ id, comment });
    return update ? res.sendStatus(200) : res.sendStatus(500);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function deletePost(req, res, next) {
  const { id } = req.params;
  console.log("ERROR");
  try {
    const { error } = await deletePostById({ id });
    console.log("ERROR 1", error);
    if (error) return res.sendStatus(500);

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function likePostController(req, res) {
  const { post_id } = req.body;
  const userid = res.locals.user.id;

  try {
    console.log("123");
    const verifyLike = await likePost(post_id, userid);
    if (verifyLike) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function unlikePostController(req, res) {
  const { id } = req.params;
  const userid = res.locals.user.id;

  try {
    await unlikePost(id, userid);

    return res.sendStatus(200);
  } catch (error) {
    return res.send(error).status(500);
  }
}

export async function isLiked(req, res) {
  const { id } = req.params;
  const userId = res.locals.user.id;

  console.log(id, userId);

  try {
    const verify = await verifyIfIsLiked(id, userId);
    console.log(verify);
    return res.send({ liked: verify }).status(200);
  } catch (error) {
    return res.send(error).status(500);
  }
}

export async function likesList(req, res) {
  const userId = res.locals.user.id;
  const { postId } = req.body;
  try {
    const totalOfLikes = await getLikesInPost(postId, userId);
    return res.send(totalOfLikes).status(200);
  } catch (error) {
    return res.send(error).status(500);
  }
}
