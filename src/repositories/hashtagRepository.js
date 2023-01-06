import { connection } from "../database/db.js";

export async function getHashtagByName(hashtag) {
    return await connection.query(`SELECT id FROM hashtags WHERE name = $1`, [hashtag]);
}

export async function createHashtag(hashtag) {
    await connection.query(`INSERT INTO hashtags (name) VALUES ($1);`, [hashtag]);
}

export async function createRelationPostHashtag(postID, hashtagID) {
    await connection.query(`INSERT INTO hashtags_posts (post_id, hashtag_id) VALUES ($1, $2);`, [postID, hashtagID]);
}