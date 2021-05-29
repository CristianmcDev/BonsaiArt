const { Router } = require("express");
const router = Router();

const { getProducts, createProducts, updateProducts, deleteProducts , getProduct} = require("../controlers/products.controller");

router.route("/")
  .get(getProducts)
  .post(createProducts)

router.route("/:id")
  .delete(deleteProducts) 
  .get(getProduct)
  .put(updateProducts)


module.exports = router;
