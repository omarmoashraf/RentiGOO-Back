const express = require("express");
const router = express.Router();

const getAllCars = require("../Controllers/Cars/getAllCars");
const getSingleCar = require("../Controllers/Cars/getSingleCar");
const addNewCar = require("../Controllers/Cars/addNewCar");
const editCar = require("../Controllers/Cars/editCar");
const deleteCar = require("../Controllers/Cars/deleteCar");

router.get("/", getAllCars);
router.get("/:id", getSingleCar);
router.post("/", addNewCar);
router.put("/:id", editCar);
router.delete("/:id", deleteCar);

module.exports = router;
