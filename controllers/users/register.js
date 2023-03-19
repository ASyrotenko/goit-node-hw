const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, `User with email: ${email} already exist`);
  }
  await User.create({ email, password, subscription });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = register;
