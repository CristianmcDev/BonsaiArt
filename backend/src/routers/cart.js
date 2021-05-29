const { Router } = require("express");
const router = Router();

const {getCarts, getCart, createCart, updateCart, deleteCart } = require("../controlers/cart.controller");

router.route("/")
  .post(createCart)
  .get(getCarts)

router.route("/:id")
  .get(getCart)
  .put(updateCart)
  .delete(deleteCart)

module.exports = router;
