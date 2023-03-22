const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!user || !isPasswordCorrect) {
    throw new RequestError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    token,
    data: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
