import bcrypt from "bcrypt";

export async function userValidation(req, res, next) {
    const { username, email, password, photo } = req.body;
  
    const user = req.body;
  
    const { error } = userSchema.validate(user, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
    const emailExists = await uniqueEmailValidation(email);
  
    if (emailExists.rowCount > 0) {
      return res.sendStatus(409);
    }
  
    res.locals = user;
  
    next();
  }