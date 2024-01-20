const {plantModel} = require("../model/db_config.js")
const upload = require("../multer/uploads.js")

const registerPlant = async (req, res) => {
    try {
        const { pcode, name, price, description } = req.body
        const images = req.files ? req.files.map(file => file.filename) : undefined;
        var result = await plantModel.find({ pcode: pcode });
        if (!pcode || !name || !price || !description || !images) {
          res.json({ status: false, message: "All fields are required" });
        } else if (result.length == 0) {
          const newPlant = {
            pcode: pcode,
            name: name,
            price: price,
            description: description,
            images: images
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

  const signUp = 

module.exports={
    registerPlant,
    getPlants,
    showPlant,
} 
