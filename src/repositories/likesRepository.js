import { connection } from "../database/db.js";

export async function deletePostLikesById(id) {
  try {
    const likes = await connection.query(
      "DELETE FROM LIKES WHERE POST_ID = $1",
      [id]
    );

    return { rowCount: likes.rowCount };
  } catch (error) {
    return { error };
  }
}
