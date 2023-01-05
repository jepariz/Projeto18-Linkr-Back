import joi from 'joi';

const loginSchema = joi.object({
  email: joi.string()
  .email()
  .required()
  .error(new Error('O campo email é obrigatório e deve ser um endereço válido')),
  password: joi.string().required().error(new Error('Todos os campos são obrigatórios!')),
});

export default loginSchema;