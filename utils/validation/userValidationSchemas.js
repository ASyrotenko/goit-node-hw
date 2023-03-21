const Joi = require("joi");

const subscriptionList = ["starter", "pro", "business"];

const joiUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const joiUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

module.exports = { joiUserSchema, joiUpdateSubscriptionSchema };
