import {
  createHashtag,
  createRelationPostHashtag,
  getHashtagByName,
} from "../repositories/hashtagRepository.js";
import { getPosts } from "../repositories/postRepository.js";
import {
  createPost,
  getIDfromLastPost,
  getOtherUserPosts,
  getPostUpdate,
} from "../repositories/timelineRepository.js";
import { getFollows } from "../repositories/usersRepository.js";

export async function getLast10Posts(req, res) {
  const { date } = req.query;
  const { id: user_id } = res.locals.user;
  let getPostConfig = { user_id };
  if (date) getPostConfig = { ...getPostConfig, ...{ date } };

  try {
    const { error, posts } = await getPosts(getPostConfig);

    if (error) return res.sendStatus(500);

    const follows = await getFollows(res.locals.user.id);

    return res.send({ posts, follows: follows.rows });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function postPost(req, res) {
  try {
    await createPost(req.body);

    const newPostID = await getIDfromLastPost(req.body.user.id);

    const hashtags = req.body.text.match(/#\w+/g);

    for (let i = 0; i < hashtags.length; i++) {
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
      await createRelationPostHashtag(newPostID, hashtagID);
    }

    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

export async function otherUserPosts(req, res) {
  const { id } = req.params;
  try {
    const postsOtherUser = await getOtherUserPosts(id);

    if (postsOtherUser.rowCount === 0) {
      return res.sendStatus(404);
    }
    return res.send(postsOtherUser.rows).status(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function updatePosts(req, res) {
  const userId = res.locals.user.id;


  try {
    const newPosts = await getPostUpdate(userId);
    return res.send(newPosts.rows).status(200)
  } catch (error) {
    return res.send(error).status(500);
  }
}
