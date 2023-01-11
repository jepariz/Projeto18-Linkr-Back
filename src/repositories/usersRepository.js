import { connection } from "../database/db.js";

export function uniqueEmailValidation(email) {
  return connection.query("SELECT * FROM users WHERE email=$1", [email]);
}

export function createUser(username, email, hashPassword, photo) {
  return connection.query(
    `INSERT INTO users (username, email, password, photo) 
          VALUES ($1, $2, $3, $4);`,
    [username, email, hashPassword, photo]
  );
}

export function findUser(email, password) {
  return connection.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [email, password]
  );
}

export function findUserByName(username) {
  return connection.query(
    `SELECT * FROM users WHERE username ILIKE '${username}%'`
  );
}

export async function checkFollow(follower_id, followed_id) {
  const results = await connection.query(
    `SELECT * FROM follows WHERE follower_id = $1 AND followed_id = $2;`, 
    [follower_id, followed_id]);
  if(results.rows.length===0) {
    return false;
  } else {
    return true;
  }
}

export async function createFollow(follower_id, followed_id) {
  await connection.query(`INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2);`, [follower_id, followed_id]);
}

export async function deleteFollow(follower_id, followed_id) {
  await connection.query(`DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2;`, [follower_id, followed_id]);
}
export function findUserByID(id) {
  return connection.query(
    `SELECT username, photo FROM users WHERE id = $1;`, [id]
  )
}