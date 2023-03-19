const express = require("express");

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models/user");

const validationMiddleware = validation(joiUserSchema);
const router = express.Router();

router.post("/register", validationMiddleware, ctrlWrapper(ctrl.register));

router.post("/login", validationMiddleware, ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
