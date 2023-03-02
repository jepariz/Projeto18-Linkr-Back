import joi from "joi";

const postSchema = joi.object({
  link: joi
    .string()
    .uri()
    .required()
    .error(
      new Error("O campo URL é obrigatório e deve ser um endereço válido")
    ),
  text: joi.string().allow(""),
});

export default postSchema;
