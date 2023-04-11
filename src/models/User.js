const bcrpyt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    password: {
      type: String,
      require: true,
    },
    refresh_token: {
      type: String,
    },
    CartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("fullName").get(() => {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", function (next) {
  if (this.userName)
    this.password = bcrpyt.hashSync(this.password, parseInt(process.env.SALT));
  next();
});

userSchema.method({
  authentication: function (password) {
    return bcrpyt.compareSync(password, this.password);
  },
});

module.exports = mongoose.model("User", userSchema);
