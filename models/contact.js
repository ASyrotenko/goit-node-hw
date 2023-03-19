const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

contactSchema.post("save", handleSchemaValidationError);

const Contact = model("contact", contactSchema);

const contactsAddSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const updateFavoriteScheme = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  contactsAddSchema,
  updateFavoriteScheme,
};

module.exports = { Contact, schemas };
