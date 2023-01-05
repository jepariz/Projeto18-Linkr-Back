import { createPost, getPosts } from "../repositories/timelineRepository.js";

export async function getLast20Posts(req, res, next) {
  return res.send(await getPosts(20));
};

export async function postPost(req,res) {
  try {
    await createPost(req.body);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}
