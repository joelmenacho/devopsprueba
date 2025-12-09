const express = require("express");
const brandController = require("../controllers/Brand");
const router = express.Router();

router
  .get("/", brandController.getAll)
  .get("/:id", brandController.getById)
  .post("/", brandController.create)
  .patch("/:id", brandController.updateById)
  .delete("/:id", brandController.deleteById);

module.exports = router;


// const mongoose=require("mongoose")
// const {Schema}=mongoose


// const brandSchema=new Schema({
//     name:{
//         type:String,
//         required:true
//     }
// })

// module.exports=mongoose.model("Brand",brandSchema)