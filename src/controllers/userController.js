import { getPostsByUserId } from "../repositories/postRepository.js";
import {
  checkFollow,
  createFollow,
  deleteFollow,
  findUserByID,
  findUserByName,
} from "../repositories/usersRepository.js";

export async function getUserPosts(req, res, next) {
  try {
    const { error, posts } = await getPostsByUserId(req.params.id);
    const userInfos = await findUserByID(req.params.id);

    if (error) return res.sendStatus(500);

    return res.status(200).send({ posts, user: userInfos.rows });
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

export async function setFollow(req, res) {
  try {
    const followed_id = Number(req.params.id);
    const follower_id = res.locals.user.id;
    const check = await checkFollow(follower_id, followed_id);
    if (check) {
      await deleteFollow(follower_id, followed_id);
    } else {
      await createFollow(follower_id, followed_id);
    }

    return res.status(200).send(!check);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function verifyFollow(req, res) {
  try {
    const followed_id = req.params.id;
    const follower_id = res.locals.user.id;
    return res.status(200).send(await checkFollow(follower_id, followed_id));
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
