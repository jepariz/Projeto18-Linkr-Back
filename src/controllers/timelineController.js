import { createHashtag, createRelationPostHashtag, getHashtagByName } from "../repositories/hashtagRepository.js";
import { getPosts } from "../repositories/postRepository.js";
import { createPost, getIDfromLastPost } from "../repositories/timelineRepository.js";

export async function getLast20Posts(req, res, next) {
  try {
    const { error, posts } = await getPosts(20);

    if (error) return res.sendStatus(500);

    return res.send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function postPost(req, res) {
  try {
    await createPost(req.body);

    const newPostID = await getIDfromLastPost(req.body.user.id);

    const hashtags = req.body.text.match(/#\w+/g);

    for(let i=0; i<hashtags.length; i++) {
      const hashtag = hashtags[i];
      const checkExistingHashtag = await getHashtagByName(hashtag);
      let hashtagID;
      if(checkExistingHashtag.rows.length===0) {
        await createHashtag(hashtag);
        const newHashtag = await getHashtagByName(hashtag);
        hashtagID = newHashtag.rows[0].id;
      } else {
        hashtagID = checkExistingHashtag.rows[0].id;
      }
      await createRelationPostHashtag(newPostID, hashtagID);
    };

    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}