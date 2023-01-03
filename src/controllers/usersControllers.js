import bcrypt from "bcrypt";
import { createUser, uniqueEmailValidation } from "../repositories/usersRepository.js";


export async function signUp(req, res) {
  console.log(req.body)
  const {username, email, password, photo } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  try {

    const emailExists = await uniqueEmailValidation(email);
  
    if (emailExists.rowCount > 0) {
      return res.sendStatus(409);
    }
  
    await createUser(username, email, hashPassword, photo);
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
