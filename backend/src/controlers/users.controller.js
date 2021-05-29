const userCtrl = {};
const UsersModel = require("../models/Users");

//recibir todos los usuarios
userCtrl.getUsers = async (req, res) => {
  const users = await UsersModel.find();


  res.json(users)
}
//recibir un usuario unico
userCtrl.getUser = async (req, res) => {
  const users = await UsersModel.findById(req.params.id);
  res.json(users)
}

//Crear usuarios
userCtrl.createUsers = async (req, res) => {
 const { name, nickname, dni, email, address, mobile, tel, user_pass } = req.body;
 const newUser = new UsersModel({
   name,
   nickname,
   dni,
   email,
   address,
   mobile,
   tel,
   user_pass
 })
 await newUser.save();
  res.json(newUser)}

// Modificar un usuario
userCtrl.updateUser = async (req, res) => {
  const { name, nickname, dni, email, address, mobile, tel, user_pass } = req.body;
  await UsersModel.findOneAndUpdate({_id: req.params.id},{
    name,
    nickname,
    dni,
    email,
    address,
    mobile,
    tel,
    user_pass
  })
  console.log(req.params.id, req.body)
  res.json({message: "usuario actualizado"})};

  //eliminar usuario
  userCtrl.deleteUser = async (req,res) => {
    await UsersModel.findOneAndDelete({_id: req.params.id});
    res.json({message:"Usuario eliminado"})
  };


module.exports = userCtrl;
