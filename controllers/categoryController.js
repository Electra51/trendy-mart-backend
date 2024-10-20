import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Name is required" });
    }
    const exisitingCategory = await categoryModel.findOne({ name });
    if (exisitingCategory) {
      return res
        .status(200)
        .json({ success: true, message: "Category already exists" });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    return res
      .status(201)
      .json({ success: true, message: "new category created", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

// get all category
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};
