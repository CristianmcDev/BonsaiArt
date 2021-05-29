const { Router } = require("express");
const router = Router();

const {getNotis, getNot, createNot, updateNot, deleteNot, updateNots } = require("../controlers/notifications.controller");

router.route("/")
  .post(createNot)
  .get(getNotis)
  .put(updateNots)

router.route("/:id")
  .get(getNot)
  .put(updateNot)
  .delete(deleteNot)

module.exports = router;
