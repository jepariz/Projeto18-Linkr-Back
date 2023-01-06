import { getPosts } from "../repositories/postRepository.js";
import { createPost } from "../repositories/timelineRepository.js";

export async function getLast20Posts(req, res, next) {
  try {
    const { error, posts } = await getPosts(20);

    if (error) return res.sendStatus(500);

    return res.send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function postPost(req, res) {
  try {
    await createPost(req.body);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}
