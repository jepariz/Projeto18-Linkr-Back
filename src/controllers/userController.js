import { getPostsByUserId } from "../repositories/postRepository.js";
import { findUserByName } from "../repositories/usersRepository.js";

export async function getUserPosts(req, res, next) {
  try {
    const { error, posts } = await getPostsByUserId(req.params.id);

    if (error) return res.sendStatus(500);

    return res.send(posts);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getUserId(req, res, next) {
  return res.send(res.locals.user);
}

export async function getUsersByName(req, res) {
  const username = req.query.q;

  let users = [];

  try {
    if (username.length >= 3) {
      const userExists = await findUserByName(username);

      if (userExists.rowCount > 0) {
        userExists.rows.map((u) => {
          users.push({
            username: u.username,
            photo: u.photo,
            id: u.id,
          });
        });
        return res.status(200).send(users);
      }
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
