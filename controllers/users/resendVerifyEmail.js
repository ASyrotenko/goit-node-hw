const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new RequestError(404, "User not found");
  }
  if (user.verify) {
    throw new RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Сonfirmation of registration",
    html: `<a href='http://localhost:3000/api/users/verify/${user.verificationToken}' target="_blank">Click to confirm registration</a>`,
  };
  await sendEmail(mail);
  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendVerifyEmail;
