import { connection } from "../database/db.js";
import urlMetadata from "url-metadata";

export async function getPosts(limit) {
  const posts = await connection.query(
    `
        SELECT POSTS.ID, USERS.USERNAME, USERS.PHOTO, POSTS.LINK, POSTS.TEXT
        FROM USERS JOIN POSTS ON POSTS.USER_ID = USERS.ID
        ORDER BY POSTS.CREATED_AT DESC
        LIMIT $1
    `,
    [limit]
  );

  for (let i = 0; i < posts.rowCount; i++) {
    const { title, image, description } = await urlMetadata(posts.rows[i].link);
    posts.rows[i] = { ...posts.rows[i], ...{ title, image, description } };
  }

  return posts.rows;
}
