const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw new RequestError(401, "Not authorized");
  }
  await User.findByIdAndUpdate(_id, { subscription });
  res.json({
    status: "success",
    code: 200,
    data: {
      email: user.email,
      subscription,
    },
  });
};

module.exports = updateSubscription;
