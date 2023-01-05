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

export async function getPostsByUserId(id) {
  const posts = await connection.query(
    `
        SELECT POSTS.ID, USERS.USERNAME, USERS.PHOTO, POSTS.LINK, POSTS.TEXT
        FROM USERS JOIN POSTS ON POSTS.USER_ID = USERS.ID
        WHERE USERS.ID = $1
        ORDER BY POSTS.CREATED_AT DESC
    `,
    [id]
  );

  for (let i = 0; i < posts.rowCount; i++) {
    const { title, image, description } = await urlMetadata(posts.rows[i].link);
    posts.rows[i] = { ...posts.rows[i], ...{ title, image, description } };
  }

  return posts.rows;
}

export async function getPostById(id) {
  const posts = await connection.query(
    `
        SELECT * FROM POSTS WHERE POSTS.ID = $1
    `,
    [id]
  );

  return posts.rows[0];
}

export async function updatePostById({ id, comment }) {
  console.log({ id, comment });
  try {
    const post = await connection.query(
      `
      UPDATE POSTS SET TEXT = $2
      WHERE POSTS.ID = $1
    `,
      [id, comment]
    );
    return post.rowCount > 0;
  } catch (error) {
    return false;
  }
}

export async function deletePostById({ id }) {
  try {
    await connection.query(
      `
      DELETE FROM POSTS WHERE POSTS.ID = $1
    `,
      [id]
    );
    return post.rowCount > 0;
  } catch (error) {
    return false;
  }
}
