const Car = require("../../Models/cars");

async function deleteCar(req, res) {
  try {
    const { id } = req.params;

    const existingCar = await Car.findOne({ externalId: id });

    if (!existingCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    await Car.deleteOne({ externalId: id });

    return res.status(200).json({
      success: true,
      message: "Car deleted permanently",
      deletedId: id,
    });
  } catch (err) {
    console.error("deleteCar error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting car",
    });
  }
}

module.exports = deleteCar;
