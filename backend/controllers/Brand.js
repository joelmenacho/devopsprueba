
const Brand = require("../models/Brand");

// Crear brand
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    // Opcional: evitar duplicados por nombre
    const existing = await Brand.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Brand already exists" });
    }

    const brand = new Brand({ name });
    await brand.save();

    return res.status(201).json(brand);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating brand, please try again later" });
  }
};

// Obtener todas las brands
exports.getAll = async (req, res) => {
  try {
    const result = await Brand.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching brands" });
  }
};

// Obtener una brand por id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching brand" });
  }
};

// Actualizar brand
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Brand.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating brand, please try again later" });
  }
};

// Eliminar brand
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Brand.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error deleting brand, please try again later" });
  }
};


// const Brand=require("../models/Brand")

// exports.getAll=async(req,res)=>{
//     try {
//         const result=await Brand.find({})
//         res.status(200).json(result)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"Error fetching brands"})
//     }
// }