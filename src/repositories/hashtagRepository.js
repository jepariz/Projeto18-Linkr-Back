import { connection } from "../database/db.js";

export async function getHashtagByName(hashtag) {
  return await connection.query(`SELECT id FROM hashtags WHERE name = $1`, [
    hashtag,
  ]);
}

export async function createHashtag(hashtag) {
  await connection.query(`INSERT INTO hashtags (name) VALUES ($1);`, [hashtag]);
}

export async function createRelationPostHashtag(postID, hashtagID) {
  await connection.query(
    `INSERT INTO hashtags_posts (post_id, hashtag_id) 
    VALUES ($1, $2);`,
    [postID, hashtagID]
  );
}

export async function getTrending() {
  return await connection.query(
    `SELECT hashtags.id, hashtags.name 
    FROM hashtags 
    JOIN hashtags_posts 
    ON hashtags.id = hashtags_posts.hashtag_id 
    GROUP BY hashtags.id 
    ORDER BY COUNT(hashtags_posts.*) DESC 
    LIMIT 10;`
  );
}

export async function deleteRelationPostHashtag(id) {
  try {
    const hashtags = await connection.query(
      `
        DELETE FROM HASHTAGS_POSTS WHERE POST_ID = $1
      `,
      [id]
    );

    return { rowCount: hashtags.rowCount };
  } catch (error) {
    return { error };
  }
}
