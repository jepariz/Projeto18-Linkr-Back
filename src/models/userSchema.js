import joi from 'joi';

const userSchema = joi.object({
  email: joi.string()
  .email()
  .required()
  .error(new Error('O campo email é obrigatório e deve ser um endereço válido')),
  password: joi.string().required().error(new Error('Todos os campos são obrigatórios!')),
  username: joi.string().required().error(new Error('Todos os campos são obrigatórios!')),
  photo: joi.string().uri().required().error(new Error('Todos os campos são obrigatórios!'))
});

export default userSchema;