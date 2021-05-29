const { Schema, model } = require("mongoose");

// Esto es para cuando añadamos un producto, requiera este esquema
const cartSchema = new Schema({

  user_id: {
    type: String,
    required: true
  },
  cart_subtotal: Number,
  cart_total: Number,
  order: [
    {
      product_id: String,
      product_img: String,
      product_name: String,
      product_price: Number,
      product_amount: Number,
      product_total: Number,
    },
  ]


});

module.exports = model("Cart", cartSchema);
