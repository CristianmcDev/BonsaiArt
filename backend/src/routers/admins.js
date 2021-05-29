const { Router } = require("express");
const router = Router();

const { getAdmins, getAdmin, createAdmins, updateAdmin, deleteAdmin} = require("../controlers/admin.controller");

router.route("/")
  .get(getAdmins)
  .post(createAdmins)

router.route("/:id")
 .get(getAdmin)
 .put(updateAdmin)
 .delete(deleteAdmin)

module.exports = router;
