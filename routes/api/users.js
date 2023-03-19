const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models/user");

const validationMiddleware = validation(joiUserSchema);
const router = express.Router();

router.post("/register", validationMiddleware, ctrlWrapper(ctrl.register));

module.exports = router;
