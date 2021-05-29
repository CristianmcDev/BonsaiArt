const { Schema, model } = require("mongoose");

// Esto es para cuando añadamos un producto, requiera este esquema
const NotiSchema = new Schema({
  order_user: String,
  order_state: String,
  order_date: String,
  order_seen: Boolean,
  order_subtotal: Number,
  order_total: Number,
  order_address: {
    name: String,
    dni: String,
    address:String,
    city:String,
    province: String,
    cp: String,
    phone:String,
    mobilephone:String,
  },
  payment:{
    name: String,
    number: String,
    date: String,
    cvc: String
  },
  order: [
    {
      product_id: String,
      product_img: String,
      product_name: String,
      product_price: Number,
      product_amount: Number,
      product_total: Number
    }
  ]

});

module.exports = model("Notifications", NotiSchema);
