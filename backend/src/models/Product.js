const { Schema, model } = require("mongoose");

// Esto es para cuando añadamos un producto, requiera este esquema
const noteSchema = new Schema({

  product_img: String,
  product_name: {
    type: String,
    required: true
  },
  product_category: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  product_info: String,


});

module.exports = model("Product", noteSchema);
