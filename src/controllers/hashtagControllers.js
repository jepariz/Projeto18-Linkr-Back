import { getHashtagByName, getTrending } from "../repositories/hashtagRepository.js";
import { getPostsByHashtagID } from "../repositories/postRepository.js";

export async function trending(req, res) {
  try {
    const popularHashtags = await getTrending();
    return res.status(200).send(popularHashtags.rows);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

export async function postsByHashtag(req,res) {
  try {
    const results = await getHashtagByName(req.params.hashtag);
    if(results.rows.length===0) {
      return res.status(200).send([]);
    }

    const hashtagID = results.rows[0].id;
    const { error, posts } = await getPostsByHashtagID(hashtagID,20);
    if (error) return res.sendStatus(500);

    return res.send(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}