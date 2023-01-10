import { connection } from "../database/db.js";
import { addMetadataToPosts } from "../repositories/urlMetadataRepository.js";

export async function getPosts(limit = 20) {
  let posts = [];
  try {
    posts = await connection.query(
      `
          SELECT POSTS.ID, USERS.USERNAME, USERS.PHOTO, POSTS.LINK, POSTS.TEXT, POSTS.USER_ID
          FROM POSTS JOIN USERS ON POSTS.USER_ID = USERS.ID
          ORDER BY POSTS.CREATED_AT DESC
          LIMIT $1 
      `,
      [limit]
    );
  } catch (error) {
    console.log(error);
    return { error };
  }

  posts = await addMetadataToPosts(posts.rows);

  return { posts: posts };
}

export async function getPostsByUserId(id) {
  let posts = [];
  try {
    posts = await connection.query(
      `
          SELECT POSTS.ID, USERS.USERNAME, USERS.PHOTO, POSTS.LINK, POSTS.TEXT, POSTS.USER_ID
          FROM POSTS JOIN USERS ON POSTS.USER_ID = USERS.ID
          WHERE USERS.ID = $1
      `,
      [id]
    );
  } catch (error) {
    console.log(error);
    return { error };
  }

  posts = await addMetadataToPosts(posts.rows);

  return { posts: posts };
}

export async function getPostById(id) {
  try {
    const posts = await connection.query(
      `
      SELECT * FROM USERS JOIN POSTS ON POSTS.USER_ID = USERS.ID
      WHERE POSTS.ID = $1;
      `,
      [id]
    );

    return { post: posts.rows[0] };
  } catch (error) {
    return { error };
  }
}

export async function updatePostById({ id, comment }) {
  try {
    await connection.query(
      `
      UPDATE POSTS SET TEXT = $2
      WHERE POSTS.ID = $1
    `,
      [id, comment]
    );
    return {};
  } catch (error) {
    return { error };
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

export async function deletePostById(id) {
  try {
    const post = await connection.query(
      `
      DELETE FROM POSTS WHERE POSTS.ID = $1
    `,
      [id]
    );

    return { rowCount: post.rowCount };
  } catch (error) {
    return { error };
  }
}

export async function getPostsByHashtagID(hashtagID, limit = 20) {
  let posts = [];
  try {
    posts = await connection.query(
      `
          SELECT POSTS.ID, USERS.USERNAME, USERS.PHOTO, POSTS.LINK, POSTS.TEXT
          FROM USERS JOIN POSTS ON USERS.ID = POSTS.USER_ID
          JOIN HASHTAGS_POSTS ON POSTS.ID = HASHTAGS_POSTS.POST_ID
          WHERE HASHTAGS_POSTS.HASHTAG_ID = $1
          ORDER BY POSTS.CREATED_AT DESC
          LIMIT $2 
      `,
      [hashtagID, limit]
    );
  } catch (error) {
    console.log(error);
    return { error };
  }

  posts = await addMetadataToPosts(posts.rows);

  return { posts: posts };
}
