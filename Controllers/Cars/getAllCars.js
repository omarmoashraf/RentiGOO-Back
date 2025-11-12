const Car = require("../../Models/cars");

async function getAllCars(req, res) {
  try {
    const cars = await Car.find({ deletedAt: null }).lean();

    const mapped = cars.map((d) => ({
      id: d.externalId || String(d._id),
      name: d.name,
      type: d.type,
      category: d.category,
      price: d.price,
      originalPrice: d.originalPrice,
      rating: d.ratingAverage || 0,
      reviews: d.ratingCount || 0,
      image: d.thumbnail || (d.images && d.images[0]) || "",
      features: d.features || [],
      specs: d.specs || {},
      available: typeof d.available === "boolean" ? d.available : true,
      description: d.description || "",
      location: d.location || "",
      included: d.included || [],
    }));

    return res.status(200).json({
      success: true,
      message: "Cars retrieved successfully",
      total: mapped.length,
      data: mapped,
    });
  } catch (err) {
    console.error("getAllCars error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving cars",
    });
  }
}

module.exports = getAllCars;
