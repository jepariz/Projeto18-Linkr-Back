import joi from "joi";

const commentSchema = joi.object({
  comment: joi.string().allow("").required(),
});

export default commentSchema;
