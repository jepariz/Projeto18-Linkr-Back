import { connection } from "../database/db.js";

export async function insertNewComment(post_id, author_id, text) {
  return await connection.query(
    `INSERT INTO comments (post_id, author_id, text) VALUES ($1, $2, $3);`,
    [post_id, author_id, text]
  );
}

export async function findComments(id) {

  return (
    await connection.query(` SELECT  u.username AS name, u.photo AS photo, u.id AS id, c.text AS text 
    FROM users AS u
    JOIN comments AS c
    ON c.author_id = u.id
    WHERE c.post_id = $1
     GROUP BY c.post_id, u.username, u.photo, u.id, c.text;`,
    [id])
  );
}
