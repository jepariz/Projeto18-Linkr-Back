import { connection } from "../database/db.js";

export async function insertNewComment(post_id, author_id, text) {
    await connection.query(`INSERT INTO comments (post_id, author_id, text) VALUES ($1, $2, $3);`, [post_id, author_id, text]);
  }