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
    [user_id]
  );
  return postsFromUserLogged.rows[0].id;
}

export function getOtherUserPosts(id) {
  return connection.query(`SELECT * FROM posts WHERE user_id = $1;`, [id]);
}

export async function getPostUpdate(id) {
  try {
    return await connection.query(
      `SELECT 
  u.id AS user_id,
  f.followed_id AS links_arr,
      (SELECT json_agg(posts)
          FROM
          ( SELECT
              p.link,
              p.text
              FROM posts AS p
              WHERE p.user_id = f.followed_id AND EXTRACT(EPOCH FROM current_timestamp - p.created_at) < 15000) 
      posts ) AS links_from_follows_updated
  FROM users AS u
  JOIN follows AS f
  ON f.follower_id = u.id
  JOIN posts AS p
  ON p.user_id = f.followed_id
  WHERE u.id = $1
  GROUP BY f.followed_id, u.id;
  `,
      [id]
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}
