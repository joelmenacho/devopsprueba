const express = require("express");
const categoryController = require("../controllers/Category");
const router = express.Router();

router
  .get("/", categoryController.getAll)
  .get("/:id", categoryController.getById)
  .post("/", categoryController.create)
  .patch("/:id", categoryController.updateById)
  .delete("/:id", categoryController.deleteById);

module.exports = router;


// const mongoose=require("mongoose")
// const {Schema}=mongoose


// const categorySchema=new Schema({
//     name:{
//         type:String,
//         required:true
//     }
// })

// module.exports=mongoose.model("Category",categorySchema)