import bcrypt from "bcrypt";
import { createUser, findUser, uniqueEmailValidation } from "../repositories/usersRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function signUp(req, res) {

  const {username, email, password, photo } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  try {

    const emailExists = await uniqueEmailValidation(email);
  
    if (emailExists.rowCount > 0) {
      return res.status(409).send("Usuário já cadastrado");
    }
  
    await createUser(username, email, hashPassword, photo);
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function login(req, res) {
  const { email, password} = req.body;
  const secret = process.env.SECRET;

  try {

    const emailExists = await uniqueEmailValidation(email);
  
    if (emailExists.rowCount === 0) {
      return res.status(409).send("Email inválido");
    }

    const passwordOk = bcrypt.compareSync(password, emailExists.rows[0].password);

    if (!passwordOk) {
      return res.status(401).send("Senha inválida");
    }

    const payload = {
      username: emailExists.rows[0].username,
      photoUrl: emailExists.rows[0].photo,
    };
  
    const jwtToken = jwt.sign(payload, secret);
  
    await findUser(email, password);
    return res.status(201).send({jwtToken, payload});
  } catch (err) {
    return res.status(500).send(err.message);
  }
}