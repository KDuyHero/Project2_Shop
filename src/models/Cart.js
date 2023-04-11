const Product = require("./Product");
const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

cartSchema.virtual("totalPrice").get(async function () {
  let total = 0;
  for (let i = 0; i < this.products.length; i++) {
    let product = await Product.findById(this.products[i]).exec();
    if (product) total += product.realPrice;
  }

  return total;
});

module.exports = mongoose.model("Cart", cartSchema);
