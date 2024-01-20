const mongoose = require("mongoose");
require('dotenv').config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

main().catch((err) => console.log(err));


async function main() {
  await mongoose.connect(dbConnectionString);
  console.log("db connected successfully!!!");
}

const plantSchema = mongoose.Schema(
    {
     pcode: {
         type : String,
         requied : true
      },
      name: {
        type : String,
        requied : true
     },
     price: {
        type : Number,
        requied : true
     },
     description: {
        type : String,
        requied : true
     },
     images: {
        type : [String],
        requied : true
     },
    },
    {
       timestamps:true
    }
);

const plantModel = mongoose.model("plants", plantSchema);


module.exports={
    plantModel
}
