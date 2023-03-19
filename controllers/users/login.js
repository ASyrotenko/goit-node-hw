const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = user
    ? bcrypt.compareSync(password, user.password)
    : false;
  if (!user || !passCompare) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
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
