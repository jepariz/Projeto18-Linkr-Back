import { insertNewComment } from "../repositories/CommentsRepository.js";


export async function postNewComment(req, res) {
    const {text, author_id, post_id} = req.body
    try {
      const newComment = await insertNewComment(post_id, author_id, text);
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }