import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().alphanum().min(5).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(20)
    .required(),
});

export default schema;
