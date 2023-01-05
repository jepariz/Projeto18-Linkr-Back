import { connection } from "../database/db";

export async function likePost(post_id, user_id) {
  await connection.query(
    `INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`,
    [post_id, user_id]
  );
}

export async function unlikePost(post_id, user_id) {
  await connection.query(
    `DELETE FROM likes WHERE post_id = $1, user_id = $1;`,
    [post_id, user_id]
  );
}