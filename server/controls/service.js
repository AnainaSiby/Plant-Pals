const { plantModel,userModel } = require("../model/db_config.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    const allPlants = await plantModel.find({});
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

const signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
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

module.exports = {
  registerPlant,
  getPlants,
  showPlant,
  signUp,
};
