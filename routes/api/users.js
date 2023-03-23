const express = require("express");

const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const {
  joiUserSchema,
  joiUpdateSubscriptionSchema,
  joiVerifyEmailSchema,
} = require("../../utils/validation");

const router = express.Router();

router.post("/register", validation(joiUserSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(joiVerifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  auth,
  validation(joiUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
