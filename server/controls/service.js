const { plantModel, userModel,cartModel } = require("../model/db_config.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
      expiresIn: '1h'
    });

    res.json({
      msg: "Login Successful",
      status: true,
      token: token
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const userInfo =  (req, res) => {
  const { id } = req.params;
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No Token Provided' });
  }
 jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ auth: false, message: 'Invalid Token' });
    } else {
      userModel.findById(decodedUser.userId)
        .then(user => {
if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json(user);
        })
        .catch(err => {
          return res.status(500).json({ message: 'Error finding user' });
        });
    }
  });
};

//add to cart

const addCart = async (req, res) => {
  try {
    const { pcode, name, price, images, email } = req.body;
    const product = {
      pcode,
      name,
      price,
      images,
     email : req.body.email
    };
    await cartModel.create(product);
    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//view cart
const viewCart = async (request, response) => {
  try {
    const userEmail = request.body.email;
    const cart = await cartModel.find({ email: userEmail });
    response.json({ status: true, carts: cart });
  } catch (error) {
    console.log(error);
  }
};

//delete cart item

const deleteCart = async (request,response)=>{
  try{
    const {id} = request.params;
    const result = await cartModel.findByIdAndDelete(id);

    if(result){
      response.json({"status":true, "message":"Item have been removed from cart!"})
    }else{
      response.json({"status":false, "message":"Item not found!"})
    }
  }
  catch(error){
    console.log(error)
  }
}


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
  deleteCart
};
