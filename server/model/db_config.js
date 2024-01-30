const mongoose = require("mongoose");
require("dotenv").config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbConnectionString);
  console.log("db connected successfully!!!");
}

const plantSchema = mongoose.Schema(
  {
    pcode: {
      type: String,
      requied: true,
    },
    name: {
      type: String,
      requied: true,
    },
    price: {
      type: Number,
      requied: true,
    },
    description: {
      type: String,
      requied: true,
    },
    images: {
      type: [String],
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);

const plantModel = mongoose.model("plants", plantSchema);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      requied: true,
    },
    phone: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

const cartSchema = mongoose.Schema(
  {
    pcode: {
      type: String,
      requied: true,
    },
    name: {
      type: String,
      requied: true,
    },
    price: {
      type: Number,
      requied: true,
    },
    images: {
      type: [String],
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("cart",cartSchema)

module.exports = {
  plantModel,
  userModel,
  cartModel
};
