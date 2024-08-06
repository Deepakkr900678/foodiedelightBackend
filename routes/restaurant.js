const express = require("express")
const router = express.Router()

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
} = require("../controllers/Restaurant")

router.post("/createRestaurant", createRestaurant)
router.get("/getAllRestaurants", getAllRestaurants)
router.get("/getRestaurantById/:id", getRestaurantById)
router.patch("/updateRestaurantById/:id", updateRestaurantById)
router.delete("/deleteRestaurantById/:id", deleteRestaurantById)

module.exports = router
