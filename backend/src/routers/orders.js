const { Router } = require("express");
const router = Router();

const {getOrders, getOrder, createOrder, updateOrder, deleteOrder } = require("../controlers/orders.controller");

router.route("/")
  .post(createOrder)
  .get(getOrders)

router.route("/:id")
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder)

module.exports = router;
