const {
  plantModel,
  userModel,
  cartModel,
  orderModel,
} = require("../model/db_config.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { search } = require("../router/routes.js");
const { request, response } = require("express");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const registerPlant = async (req, res) => {
  try {
    const { pcode, name, price, description } = req.body;
    const images = req.files
      ? req.files.map((file) => file.filename)
      : undefined;
    var result = await plantModel.find({ pcode: pcode });
    if (!pcode || !name || !price || !description || !images) {
      res.json({ status: false, message: "All fields are required" });
    } else if (result.length == 0) {
      const newPlant = {
        pcode: pcode,
        name: name,
        price: price,
        description: description,
        images: images,
      };
      const addPlant = await plantModel.create(newPlant);
      res.json({ status: true, message: "Successfully Created" });
    } else {
      res.json({ status: false, message: "Plant already exists!" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

const getPlants = async (request, response) => {
  try {
    if (request.query.search != undefined) {
      searchQuery = request.query.search;
     regex = new RegExp(searchQuery, "i");
    }
    const allPlants = await plantModel.find({ name: regex });
    response.json({ status: true, plants: allPlants });
  } catch (error) {
    console.log(error);
  }
};

const showPlant = async (request, response) => {
  try {
    const { id } = request.params;
    const plant = await plantModel.findById(id);
    response.json({ status: true, plant: plant });
  } catch (error) {
    console.log(error);
  }
};

//Update
const updatePlant = async (request, response) => {
  try {
    const { pcode, name, price, description } = request.body;
    const { id } = request.params;
    const images = request.files
      ? request.files.map((file) => file.filename)
      : undefined;
    const Plant = {
      pcode: pcode,
      name: name,
      price: price,
      description: description,
      images: images,
    };
    const result = await plantModel.findByIdAndUpdate(id, Plant);
    if (!result) {
      response.json({ status: false, message: "Id not found" });
    } else {
      response.json({ status: true, message: "Updated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

//Delete

const deletePlant = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await plantModel.findByIdAndDelete(id);

    if (result) {
      response.json({ status: true, message: "Plant deleted successfully!" });
    } else {
      response.json({ status: false, message: "plant not found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const em =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const nameRegEXP = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (name == "" || name == null) {
      res.json({ status: false, msg: "Name is required" });
      return;
    } else if (nameRegEXP.test(name) == false) {
      res.json({ status: false, msg: "Please enter a valid name" });
      return;
    }

    if (email == "" || email == null) {
      res.json({ status: false, msg: "Email is required" });
      return;
    } else if (em.test(email) == false) {
      res.json({ status: false, msg: "Enter a valid Email" });
      return;
    }

    var result = await userModel.find({ email: email });
    if (result.length === 0) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        userModel.create({
          name: name,
          email: email,
          phone: phone,
          address: address,
          password: hash,
        });
      });
      res.json({ status: true, msg: "Successfully Registered" });
    } else {
      res.json({ status: false, msg: "Email already exists" });
    }
  } catch (err) {
    console.log(err);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ msg: "Incorrect Email", status: false });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ msg: "Incorrect Password", status: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.json({
      msg: "Login Successful",
      status: true,
      token: token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const userInfo = (req, res) => {
  const { id } = req.params;
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ auth: false, message: "No Token Provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ auth: false, message: "Invalid Token" });
    } else {
      userModel
        .findById(decodedUser.userId)
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json(user);
        })
        .catch((err) => {
          return res.status(500).json({ message: "Error finding user" });
        });
    }
  });
};

//add to cart

const addCart = async (req, res) => {
  try {
    const { pcode, name, price, images, quantity, email } = req.body;

    const existingCartItem = await cartModel.findOne({ pcode, email });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice = existingCartItem.quantity * price;
      await existingCartItem.save();
    } else {
      const totalPrice = quantity * price;
      const product = {
        pcode,
        name,
        price,
        images,
        quantity,
        email,
        totalPrice,
      };
      await cartModel.create(product);
    }
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//view cart
const viewCart = async (request, response) => {
  const { email } = request.body;

  if (!email) {
    return response.status(400).json({ error: "Email parameter is required" });
  }

  try {
    // Find cart items based on the provided email
    const cartItems = await cartModel.find({ email });

    response.json({ carts: cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};

//delete cart item

const deleteCartItem = async (request, response) => {
  try {
    const { pcode, email } = request.params;
    const filter = { pcode: pcode, email: email };
    const result = await cartModel.deleteMany(filter);
    if (result.deletedCount > 0) {
      response.json({
        status: true,
        message: "Items have been removed from cart!",
      });
    } else {
      response.json({ status: false, message: "Items not found!" });
    }
  } catch (error) {
    console.error("Error occurred while deleting documents", error);
    response
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

//delete cart when order placed

const deleteCart = async (request, response) => {
  try {
    const { email } = request.params;
    const filter = { email: email };
    const result = await cartModel.deleteMany(filter);
    if (result.deletedCount > 0) {
      response.json({ status: true, message: "Cart deleted" });
    } else {
      response.json({ status: false, message: "Cart not found!" });
    }
  } catch (error) {
    console.error("Error occurred while deleting documents", error);
    response
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { products, totalPrice, email, address, phone } = req.body;
    const newOrder = {
      products: products,
      totalPrice: totalPrice,
      email: email,
      address: address,
      phone: phone,
    };
    const createdOrder = await orderModel.create(newOrder);
    res
      .status(201)
      .json({ message: "Order placed successfully", order: createdOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//payment integration
const payment = async (req, res) => {
  const total = req.body.amount;
  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount: total *100,
          currency: 'inr',
      });
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const myOrders = async (req, res) => {
  try {
    const email = req.query.email;
    const order = await orderModel.find({ email: email });
    res.json({ orders: order });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerPlant,
  getPlants,
  showPlant,
  signUp,
  signIn,
  updatePlant,
  deletePlant,
  userInfo,
  addCart,
  viewCart,
  deleteCartItem,
  deleteCart,
  placeOrder,
  myOrders,
  payment
};
