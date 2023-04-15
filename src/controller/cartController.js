const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

// POST  /add
// middleware requireSignin
let addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).exec();
    // has cart
    if (cart) {
      let product = req.body.cartItems.product;
      // find product in cart
      let indexItem = cart.cartItems.findIndex((item) => {
        return item.product == product;
      });
      // has product
      if (indexItem >= 0) {
        let newQuantity =
          cart.cartItems[indexItem].quantity + req.body.cartItems.quantity;
        // change cartItems with spread
        cart.cartItems[indexItem] = {
          ...req.body.cartItems,
          quantity: newQuantity,
        };
        // save
        let newCart = await cart.save();
        res.status(200).json({
          message: "OK",
          newCart,
        });
      } else {
        // add product to cart
        cart.cartItems.push(req.body.cartItems);
        cart.save();
        return res.send("new cart");
      }
    } else {
      console.log(1);
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      console.log(2);
      await newCart.save();
      console.log(3);
      return res.status(201).json({ newCart });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// remove is add with odd quantity
let removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).exec();
    // has cart
    if (cart) {
      let product = req.body.cartItems.product;
      // find product in cart
      let indexItem = cart.cartItems.findIndex((item) => {
        return item.product == product;
      });
      // has product
      if (indexItem >= 0) {
        // change cartItems with spread
        // new quantity
        let newQuantity =
          cart.cartItems[indexItem].quantity + req.body.cartItems.quantity;
        if (newQuantity <= 0) {
          cart.cartItems.splice(indexItem, 1);
          let newCart = await cart.save();
          return res.status(200).json({
            message: "OK",
            newCart,
          });
        }
        cart.cartItems[indexItem] = {
          ...req.body.cartItems,
          quantity: newQuantity,
        };
        // save
        let newCart = await cart.save();
        res.status(200).json({
          message: "OK",
          newCart,
        });
      } else {
        // add product to cart

        return res.send("don't has product");
      }
    } else {
      console.log(1);
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      console.log(2);
      await newCart.save();
      console.log(3);
      return res.status(201).json({ newCart });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
module.exports = { addToCart, removeFromCart };
