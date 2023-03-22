const gravatar = require("gravatar");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new RequestError(409, `User with email: ${email} already exist`);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword, subscription, avatarURL });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = register;
