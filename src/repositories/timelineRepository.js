import { connection } from "../database/db.js";

export async function createPost(data) {
  await connection.query(
    `INSERT INTO posts (link, text, user_id) VALUES ($1, $2, $3);`,
    [data.link, data.text, data.user.id]
  );
}

export async function getIDfromLastPost(user_id) {
  const postsFromUserLogged = await connection.query(
    `SELECT id FROM posts WHERE user_id = $1 ORDER BY id DESC`, 
    [user_id]);
  return postsFromUserLogged.rows[0].id;
}

export function getOtherUserPosts(id) {
  return connection.query(`SELECT * FROM posts WHERE user_id = $1;`, [
    id,
  ]);
}