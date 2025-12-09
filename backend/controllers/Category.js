const Category = require("../models/Category");

// Crear categoría
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = new Category({ name });
    await category.save();

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating category, please try again later" });
  }
};

// Obtener todas
exports.getAll = async (req, res) => {
  try {
    const result = await Category.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Obtener una por id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching category" });
  }
};

// Actualizar
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating category, please try again later" });
  }
};

// Eliminar
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error deleting category, please try again later" });
  }
};

// const Category=require("../models/Category")

// exports.getAll=async(req,res)=>{
//     try {
//         const result=await Category.find({})
//         res.status(200).json(result)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"Error fetching categories"})
//     }
// }