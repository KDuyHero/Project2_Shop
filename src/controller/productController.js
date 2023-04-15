const Product = require("../models/Product");

// GET /
let getAllProduct = async (req, res) => {
  try {
    let products = await Product.find({}).exec();
    return res.status(200).json({
      message: "OK",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

// GET /:id
let getProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id).exec();
    if (!product) {
      return res.status(400).json({
        message: "don't found product",
      });
    }
    res.render("Product/ViewProduct", {
      product: product,
      signin: true,
      signup: true,
    });
    // return res.status(200).json({
    //   message: "successful",
    //   product,
    // });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};

//  POST /
let createProduct = async (req, res) => {
  try {
    let data = ({ name, description, price, discount } = req.body);
    data.image = req.file.path.split("public")[1];
    new Product(data).save((validateBeforeSave = true));
    return res.redirect("/api/products/new");
    // return res.status(200).json({
    //   message: "Create new product successful",
    // });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

let getEditProductForm = async (req, res) => {
  try {
    let productId = req.params.id;
    let product = await Product.findById(productId).exec();

    return res.render("Product/EditProduct", { product: product });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};
// PUT /:id
let updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let data = ({ name, description, price, discount } = req.body);
    if (req.file) {
      data.image = req.file.path.split("public")[1];
    }
    let newProduct = await Product.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    return res.redirect("/api");
    return res.status(200).json({
      message: "OK",
      newProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

// DELETE /:id
let deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let productDelete = await Product.findByIdAndDelete(id).exec();
    return res.redirect("/api");
    return res.status(200).json({
      message: "OK",
      productDelete,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};
module.exports = {
  getAllProduct,
  getProduct,
  createProduct,
  getEditProductForm,
  updateProduct,
  deleteProduct,
};
