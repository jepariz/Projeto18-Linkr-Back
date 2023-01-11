import { connection } from "../database/db.js";

export async function createRepost({ post_id, user_id }) {
  try {
    await connection.query(
      `
            INSERT INTO REPOST (user_id, post_id) VALUES ($1, $2);
        `,
      [user_id, post_id]
    );
    return {};
  } catch (error) {
    return { error };
  }
}

export async function deleteRepost(post_id) {
  try {
    await connection.query(
      `
      DELETE FROM REPOST WHERE POST_ID = $1
    `,
      [post_id]
    );

    return {};
  } catch (error) {
    return { error };
  }
}
