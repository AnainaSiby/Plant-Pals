const { plantModel, userModel,cartModel } = require("../model/db_config.js");
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


//Update
const updatePlant =async (request,response) =>{
  try{
    const {id} = request.params;
    const result = await plantModel.findByIdAndUpdate(id,request.body);

    if(!result) {
      response.json({"status":false , "message":"Id not found"})
    }else{
      response.json({"status":true, "message":"Updated successfully"})
    }
  }
  catch(err){
    console.log(err)
  }
}

//Delete

const deletePlant = async (request,response)=>{
  try{
    const {id} = request.params;
    const result = await plantModel.findByIdAndDelete(id);

    if(result){
      response.json({"status":true, "message":"Plant deleted successfully!"})
    }else{
      response.json({"status":false, "message":"plant not found!"})
    }
  }
  catch(error){
    console.log(error)
  }
}


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

const signIn = async (req, res) => {
  const { email, password } = req.body;
  
  const results = await userModel.find({ email: email });
  if (results.length == 0) {
    res.json({ msg: "Incorrect Email", status: false });
  } else {
    const hashedpassword = results[0].password;
    bcrypt.compare(password, hashedpassword, function (err, result) {
      if (result == true) {
        res.json({
          msg: "Login Successful",
          status: true,
          userid: results[0]._id,
        });
      } else {
        res.json({ msg: "Incorrect Password", status: false });
      }
    });
  }
};


module.exports = {
  registerPlant,
  getPlants,
  showPlant,
  signUp,
  signIn,
  updatePlant,
  deletePlant
};
