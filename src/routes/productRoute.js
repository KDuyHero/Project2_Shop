const express = require("express");
const multer = require("multer");
const route = express.Router();
const {
  getAllProduct,
  getProduct,
  createProduct,
  getEditProductForm,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "product-" + Date.now() + "-" + req.body.name + ".jpg");
  },
});

const upload = multer({ storage: storage });

// get all product ~ Homepage
route.get("/", getAllProduct);

// get form create product
route.get("/new", (req, res) => {
  res.render("Product/AddProduct", {});
});
// get form edit
route.get("/:id/edit", getEditProductForm);
//get one product ~ ViewDetail
route.get("/:id", getProduct);

// create new product
route.post("/", upload.single("productImage"), createProduct);

// update product
route.put("/:id", upload.single("productImage"), updateProduct);

//delete product
route.delete("/:id", deleteProduct);
module.exports = route;
