const notificationsCtrl = {};
const NotificationsModel = require("../models/Notifications");

notificationsCtrl.getNotis = async (req, res) => {
  const noti =  await NotificationsModel.find();
  res.json(noti);
};
notificationsCtrl.getNot = async (req, res) => {
  const noti =  await NotificationsModel.findById(req.params.id);
    res.json(noti);
  };

notificationsCtrl.updateNots = async (req, res) => {
  const noti =  await NotificationsModel.findOneAndUpdate();
    res.json({message:"Notificaciones actualizadas"});
  };


notificationsCtrl.createNot = async (req, res) => {
  const {order_user, order_state, order_date, order_seen, payment, order_subtotal, order_total, order_address, order } = req.body;
  const newNot = new NotificationsModel({
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
  await newNot.save();
  res.json({message: "Notificación guardado"})
};

notificationsCtrl.updateNot = async (req, res) =>{
  const { order_user, order_state, order_date, order_seen, payment, order_subtotal, order_total, order_address, order } = req.body;
  await NotificationsModel.findOneAndUpdate({_id: req.params.id},{
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


 res.json({message: "Notificación actualizado"})};

 //eliminar carrito
 notificationsCtrl.deleteNot = async (req,res) => {
   await NotificationsModel.findOneAndDelete({_id: req.params.id});
   res.json({message:"Notificación eliminado"})
 };

module.exports = notificationsCtrl;
