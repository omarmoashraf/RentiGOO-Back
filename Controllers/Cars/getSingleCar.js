// API/Controllers/Cars/getSingleCar.js
const Car = require("../../Models/cars");

async function getSingleCar(req, res) {
  try {
    const { id } = req.params;

    const car = await Car.findOne({ externalId: id, deletedAt: null }).lean();
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const images =
      car.images && car.images.length
        ? car.images
        : Array(3).fill(car.thumbnail || "");

    const response = {
      id: car.externalId || String(car._id),
      name: car.name,
      type: car.type,
      category: car.category,
      price: car.price,
      originalPrice: car.originalPrice,
      rating: car.ratingAverage || 0,
      reviews: car.ratingCount || 0,
      image: car.thumbnail || images[0] || "",
      images,
      features: car.features || [],
      specs: car.specs || {},
      available: typeof car.available === "boolean" ? car.available : true,
      description: car.description || "",
      location: car.location || "",
      included: car.included || [],
    };

    return res.status(200).json({
      success: true,
      message: "Car retrieved successfully",
      data: response,
    });
  } catch (err) {
    console.error("getSingleCar error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving car",
    });
  }
}

module.exports = getSingleCar;
