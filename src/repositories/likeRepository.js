import { connection } from "../database/db.js";

export async function verifyIfIsLiked(post_id, user_id) {
  try {
    const teste = await connection.query(
      `SELECT * FROM likes WHERE post_id = $1 AND user_id = $2`,
      [post_id, user_id]
    );

    return teste.rowCount > 0;
  } catch (error) {
    console.log("deu erro");
    return false;
  }
}

export async function likePost(post_id, user_id) {
  try {
    await connection.query(
      `INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`,
      [post_id, user_id]
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function unlikePost(post_id, user_id) {
  try {
    const teste = await connection.query(
      `DELETE FROM likes WHERE post_id = $1 AND user_id = $2;`,
      [post_id, user_id]
    );
    return true;
  } catch (error) {
    console.log("caiu no catch");
    console.log(error);
    return false;
  }
}

export async function getLikesInPost(post_id, user_id) {
  try {
    const data = await connection.query(
      `
    SELECT 
    COUNT("post_id") AS likes,(
         SELECT json_agg(likes)
            FROM (
                SELECT u.username
                FROM likes AS l
                JOIN users AS u
                ON l.user_id = u.id
                WHERE l.post_id = $1
                ) likes
        ) as users
    FROM likes AS l
    WHERE post_id = $1
    GROUP BY l.post_id;
    `,
      [post_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
