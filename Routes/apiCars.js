const express = require("express");
const router = express.Router();

const getAllCars = require("../Controllers/Cars/getAllCars");
const getSingleCar = require("../Controllers/Cars/getSingleCar");

router.get("/", getAllCars);

router.get("/:id", getSingleCar);

module.exports = router;
