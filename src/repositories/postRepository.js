import { connection } from "../database/db.js";
import urlMetadata from "url-metadata";

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

async function addMetadataToPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    try {
      const { title, image, description } = await urlMetadata(posts[i].link);
      posts[i] = { ...posts[i], ...{ title, image, description } };
    } catch (error) {
      posts[i] = {
        ...posts[i],
        ...{
          title: "Não foi possivel encontrar esse link",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39CGp9ylTkfbLNKAaYTIT0930v6E2k3iyTRCewYL4Nw&s",
          description: "Não foi possivel encontrar uma descricao",
        },
      };
    }
  }
  return posts;
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
    const likes = await connection.query(
      "DELETE FROM LIKES WHERE POST_ID = $1",
      [id]
    );

    const hashtags = await connection.query(
      `
        DELETE FROM HASHTAGS_POSTS WHERE POST_ID = $1
      `,
      [id]
    );

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
          SELECT POSTS.ID, USERS.USERNAME, USERS.PHOTO, POSTS.LINK, POSTS.TEXT, POSTS.USER_ID
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
