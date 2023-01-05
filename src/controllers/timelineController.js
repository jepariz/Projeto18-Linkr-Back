import { createPost, getPosts } from "../repositories/timelineRepository.js";

export async function getLast20Posts(req, res, next) {
  return res.send(await getPosts(20));
};

export async function postPost(req,res) {
  try {
    console.log(res.locals);
    const data = {...req.body, id: res.locals.user.id};
    console.log(data);
    // await createPost(data);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}
