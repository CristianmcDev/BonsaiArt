const cartCtrl = {};
const CartModel = require("../models/Cart");

cartCtrl.getCarts = async (req, res) => {
  const cart =  await CartModel.find();
  res.json(cart);
};
cartCtrl.getCart = async (req, res) => {
  const cart =  await CartModel.findById(req.params.id);
    res.json(cart);
  };


cartCtrl.createCart = async (req, res) => {
  const { user_id, cart_subtotal, cart_total, order } = req.body;
  const newProduct = new CartModel({

    user_id,
    cart_subtotal,
    cart_total,
    order
  })
  await newProduct.save();
  res.json({message: "Producto guardado"})
};

cartCtrl.updateCart = async (req, res) =>{
  const { user_id, cart_subtotal, cart_total, order } = req.body;
  await CartModel.findOneAndUpdate({_id: req.params.id},{

    user_id,
    cart_subtotal,
    cart_total,
    order
  })
  console.log(req.params.id, req.body)


 res.json({message: "Producto actualizado"})};

 //eliminar carrito
 cartCtrl.deleteCart = async (req,res) => {
   await CartModel.findOneAndDelete({_id: req.params.id});
   res.json({message:"carrito eliminado"})
 };

module.exports = cartCtrl;
