import { connection } from "../database/db.js";

export async function createPost(data) {
  await connection.query(
    `INSERT INTO posts (link, text, user_id) VALUES ($1, $2, $3);`,
    [data.link, data.text, data.user.id]
  );
}
