const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const imageName = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      status: "success",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
