import {
  createHashtag,
  createRelationPostHashtag,
  deleteRelationPostHashtag,
  getHashtagByName,
} from "../repositories/hashtagRepository.js";
import { deletePostLikesById } from "../repositories/likesRepository.js";
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
    const { error: errorHashtag } = await deleteRelationPostHashtag(id);
    if (errorHashtag) return res.sendStatus(500);

    const hashtags = comment.match(/#\w+/g);

    for (let i = 0; i < hashtags?.length ?? 0; i++) {
      const hashtag = hashtags[i].slice(1);
      const checkExistingHashtag = await getHashtagByName(hashtag);
      let hashtagID;
      if (checkExistingHashtag.rows.length === 0) {
        await createHashtag(hashtag);
        const newHashtag = await getHashtagByName(hashtag);
        hashtagID = newHashtag.rows[0].id;
      } else {
        hashtagID = checkExistingHashtag.rows[0].id;
      }
      await createRelationPostHashtag(id, hashtagID);
    }

    const { error: errorUpdatePost } = await updatePostById({ id, comment });
    return !errorUpdatePost ? res.sendStatus(200) : res.sendStatus(500);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deletePost(req, res, next) {
  const { id } = req.params;
  try {
    const { error: errorHashtag } = await deleteRelationPostHashtag(id);

    if (errorHashtag) return res.sendStatus(500);

    const { error: errorLikes } = await deletePostLikesById(id);

    if (errorLikes) return res.sendStatus(500);

    const { error: errorPost } = await deletePostById(id);
    if (errorPost) return res.sendStatus(500);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function likePostController(req, res) {
  const { post_id } = req.body;
  const userid = res.locals.user.id;

  try {
    const verifyLike = await likePost(post_id, userid);
    if (verifyLike) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
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

  try {
    const verify = await verifyIfIsLiked(id, userId);
    return res.send({ liked: verify }).status(200);
  } catch (error) {
    return res.send(error).status(500);
  }
}

export async function likesList(req, res) {
  const userId = res.locals.user.id;
  const { postId } = req.params;
  console.log("TESTE AQUI", req.params);
  try {
    const totalOfLikes = await getLikesInPost(postId, userId);
    return res.send(totalOfLikes).status(200);
  } catch (error) {
    return res.send(error).status(500);
  }
}
