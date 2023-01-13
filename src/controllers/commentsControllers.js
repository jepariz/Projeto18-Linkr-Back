import { findComments, insertNewComment } from "../repositories/commentsRepository.js";
import { checkFollow } from "../repositories/usersRepository.js";

export async function postNewComment(req, res) {
    const {text, author_id, post_id} = req.body
    try {
      const newComment = await insertNewComment(post_id, author_id, text);
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  export async function getComments(req, res) {
    const id = req.params.id
    const userId = res.locals.user.id
   
    try {
      const comments = await findComments(id);

      await Promise.all(comments.rows.map(async (comment) => {
        const isFollower = await checkFollow(userId, comment.id); 
        comment.isFollower = isFollower;
    }));

      return res.status(200).send(comments.rows);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

