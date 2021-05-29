const productsCtrl = {};
const ProductModel = require("../models/Product");

productsCtrl.getProducts = async (req, res) => {
const products =  await ProductModel.find();
  res.json(products);
  };

productsCtrl.getProduct = async (req, res) =>{
  const product =  await  ProductModel.findById(req.params.id)
  res.json(product)
  };

// A partir de aqui, en prodictos no implelemtar

productsCtrl.createProducts = async (req, res) => {
  const { product_img, product_name, product_category, product_price, product_info } = req.body;
  const newProduct = new ProductModel({
  
    product_img,
    product_name,
    product_category,
    product_price,
    product_info

  })
  await newProduct.save();
  res.json({message: "Producto guardado"})
};

productsCtrl.updateProducts = async (req, res) =>{
  const { product_img, product_name, product_category, product_price, product_info } = req.body;
  await ProductModel.findOneAndUpdate({_id: req.params.id},{
  
    product_img,
    product_name,
    product_category,
    product_price,
    product_info
  })
  console.log(req.params.id, req.body)


 res.json({message: "Producto actualizado"})};

productsCtrl.deleteProducts = async (req, res) => {

 await ProductModel.findOneAndDelete({_id: req.params.id});

  res.json({message: "Producto eliminado"})

};
//-----------------------------------------


module.exports = productsCtrl;
