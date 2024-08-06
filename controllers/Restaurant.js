const restaurantModel = require("../models/Restaurant");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, location, contactNumber, openingHours } = req.body;
    const restaurantImage = req.files && req.files.image;

    console.log(req.body, "req.body");
    console.log(req.files, "req.files");
    console.log(req.files.image, "req.files.image");
    if (!name || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    const uploadedImage = await uploadImageToCloudinary(
      restaurantImage,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const newRestaurant = await restaurantModel.create({
      name,
      description,
      location,
      contactNumber,
      openingHours,
      image: uploadedImage.secure_url,
    });

    res.status(201).json({
      success: true,
      data: newRestaurant,
      message: "Restaurant Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
};

exports.getAllRestaurants = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalRestaurants = await restaurantModel.countDocuments();
    const totalPages = Math.ceil(totalRestaurants / limit);
    const offset = (page - 1) * limit;

    const restaurants = await restaurantModel.find().skip(offset).limit(limit);

    return res.status(200).json({
      success: true,
      message: "Restaurants retrieved successfully",
      restaurants,
      currentPage: page,
      totalPages,
      totalRestaurants
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve restaurants. Please try again.",
    });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Restaurant retrieved successfully",
      restaurant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve restaurant. Please try again.",
    });
  }
};

exports.updateRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const restaurant = await restaurantModel.findByIdAndUpdate(id, updates, { new: true });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update restaurant. Please try again.",
    });
  }
};

exports.deleteRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete restaurant. Please try again.",
    });
  }
};