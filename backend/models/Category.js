const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);


// const mongoose=require("mongoose")
// const {Schema}=mongoose


// const categorySchema=new Schema({
//     name:{
//         type:String,
//         required:true
//     }
// })

// module.exports=mongoose.model("Category",categorySchema)