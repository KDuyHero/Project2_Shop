const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require,
  },
  description: {
    type: String,
    require,
  },
  image: {
    type: String,
    require,
  },
  price: {
    type: String,
    require,
  },
  discount: {
    type: String,
    require,
  },
});

productSchema.virtual("realPrice").get(function () {
  return this.price * (100 - this.discount);
});

module.exports = mongoose.model("Product", productSchema);
