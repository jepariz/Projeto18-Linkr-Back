import jwt from "jsonwebtoken";
import { connection } from "../database/db.js";

export default function (req, res, next) {
  const { authorization} = req.headers;
  if (!authorization) return res.sendStatus(401);
  const bearer_token = authorization.split(" ");
  if (bearer_token.length !== 2 || bearer_token[0] !== "Bearer")
    return res.sendStatus(401);

  return jwt.verify(
    bearer_token[1],
    process.env.SECRET,
    async (error, token) => {
      if (error) return res.sendStatus(401);
      const queryString = `
        SELECT * FROM USERS WHERE USERS.USERNAME = $1
      `;
      try {
        const users = await connection.query(queryString, [token.username]);
        if (users.rows.length === 0) return res.sendStatus(401);
        res.locals.user = users.rows[0];
      } catch (error) {
        return res.sendStatus(401);
      }
      return next();
    }
  );
}
