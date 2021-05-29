const { Router } = require("express");
const router = Router();

const { getUsers, getUser, createUsers, updateUser, deleteUser} = require("../controlers/users.controller");

router.route("/")
  .get(getUsers)
  .post(createUsers)

router.route("/:id")
 .get(getUser)
 .put(updateUser)
 .delete(deleteUser)

module.exports = router;
