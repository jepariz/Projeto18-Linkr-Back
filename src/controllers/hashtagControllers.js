import { getTrending } from "../repositories/hashtagRepository.js";

export async function trending(req, res) {
    try {
        const popularHashtags = await getTrending();
        return res.status(200).send(popularHashtags.rows);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message);
    }
}