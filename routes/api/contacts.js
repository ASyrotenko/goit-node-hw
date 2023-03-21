const express = require("express");

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { schemas } = require("../../utils/validation");
const { contacts: ctrl } = require("../../controllers");

const validationMiddleware = validation(schemas.contactsAddSchema);
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validationMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteScheme),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.put(
  "/:contactId",
  isValidId,
  validationMiddleware,
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
