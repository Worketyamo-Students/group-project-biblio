import Joi from "joi";

const schema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ' -]+$/)
    .min(2)
    .max(50)
    .messages({
      "string.pattern.base": `"name" must contain only letters, spaces, apostrophes, or hyphens`,
    }),

  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

export default schema;
