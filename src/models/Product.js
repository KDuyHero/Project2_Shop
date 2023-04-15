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
    type: Number,
    require,
  },
  discount: {
    type: Number,
    require,
    default: 0,
  },
});

productSchema.virtual("realPrice").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

module.exports = mongoose.model("Product", productSchema);
