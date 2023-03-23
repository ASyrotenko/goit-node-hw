const register = require("./register");
const verifyEmail = require("./verifyEmail");
const login = require("./login");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  verifyEmail,
  login,
  getCurrentUser,
  logout,
  updateSubscription,
  updateAvatar,
  resendVerifyEmail,
};
