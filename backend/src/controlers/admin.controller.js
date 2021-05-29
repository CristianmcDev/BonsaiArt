const adminCtrl = {};
const AdminModel = require("../models/Admin");

//recibir todos los admins
adminCtrl.getAdmins = async (req, res) => {
  const admins = await AdminModel.find();


  res.json(admins)
}
//recibir un admin unico
adminCtrl.getAdmin = async (req, res) => {
  const admins = await AdminModel.findById(req.params.id);
  res.json(admins)
}

//Crear admins
adminCtrl.createAdmins = async (req, res) => {
 const { name, nickname, user_pass } = req.body;
 const newAdmin = new AdminModel({
   name,
   nickname,
   user_pass
 })
 await newAdmin.save();
  res.json(newAdmin)}

// Modificar un admin
adminCtrl.updateAdmin = async (req, res) => {
  const { name, nickname, user_pass } = req.body;
  await AdminModel.findOneAndUpdate({_id: req.params.id},{
    name,
    nickname,
    user_pass
  })
  console.log(req.params.id, req.body)
  res.json({message: "Admin actualizado"})};

  //eliminar admin
  adminCtrl.deleteAdmin = async (req,res) => {
    await AdminModel.findOneAndDelete({_id: req.params.id});
    res.json({message:"Admin eliminado"})
  };


module.exports = adminCtrl;
