const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new RequestError(409, `User with email: ${email} already exist`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Сonfirmation of registration",
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}' target="_blank">Click to confirm registration</a>`,
  };
  await sendEmail(mail);
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
