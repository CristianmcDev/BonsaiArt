const ordersCtrl = {};
const OrdersModel = require("../models/Orders");

ordersCtrl.getOrders = async (req, res) => {
  const order =  await OrdersModel.find();
  res.json(order);
};
ordersCtrl.getOrder = async (req, res) => {
  const order =  await OrdersModel.findById(req.params.id);
    res.json(order);
  };


ordersCtrl.createOrder = async (req, res) => {
  const {order_user, order_state, order_date, order_seen, payment, order_subtotal, order_total, order_address, order } = req.body;
  const newOrder = new OrdersModel({
    order_user,
    order_state,
    order_date,
    order_seen,
    order_subtotal,
    order_total,
    payment,
    order_address,
    order
  })
  await newOrder.save();
  res.json({message: "Pedido guardado"})
};

ordersCtrl.updateOrder = async (req, res) =>{
  const { order_user, order_state, order_date, order_seen, payment, order_subtotal, order_total, order_address, order } = req.body;
  await OrdersModel.findOneAndUpdate({_id: req.params.id},{
    order_user,
    order_state,
    order_date,
    order_seen,
    payment,
    order_subtotal,
    order_total,
    order_address,
    order
  })
  console.log(req.params.id, req.body)


 res.json({message: "Pedido actualizado"})};

 //eliminar carrito
 ordersCtrl.deleteOrder = async (req,res) => {
   await OrdersModel.findOneAndDelete({_id: req.params.id});
   res.json({message:"Pedido eliminado"})
 };

module.exports = ordersCtrl;
