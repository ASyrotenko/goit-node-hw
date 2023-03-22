const express = require("express");

const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const {
  joiUserSchema,
  joiUpdateSubscriptionSchema,
} = require("../../utils/validation");

const validationMiddleware = validation(joiUserSchema);
const router = express.Router();

router.post("/register", validationMiddleware, ctrlWrapper(ctrl.register));

router.post("/login", validationMiddleware, ctrlWrapper(ctrl.login));

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
