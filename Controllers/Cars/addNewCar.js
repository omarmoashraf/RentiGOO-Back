const Car = require("../../Models/cars");

async function addNewCar(req, res) {
  try {
    const data = req.body;

    if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required and cannot be empty",
      });
    }

    if (
      data.price == null ||
      isNaN(Number(data.price)) ||
      Number(data.price) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price is required and must be a valid number greater than 0",
      });
    }

    const price = Number(data.price);

    const lastCar = await Car.findOne().sort({ externalId: -1 }).lean();
    const nextId = lastCar ? Number(lastCar.externalId) + 1 : 1;

    const newCar = await Car.create({
      externalId: String(nextId),
      name: data.name.trim(),
      type: data.type || "",
      category: data.category || "uncategorized",

      price: price,
      originalPrice: data.originalPrice ? Number(data.originalPrice) : price,

      features: data.features || [],
      specs: data.specs || {},
      images: data.images || [],

      thumbnail: data.thumbnail || (data.images?.length ? data.images[0] : ""),

      included: data.included || [],

      ratingAverage: 0,
      ratingCount: 0,
      available: data.available ?? true,

      description: data.description || "",
      location: data.location || "",
    });

    return res.status(201).json({
      success: true,
      message: "Car added successfully",
      data: {
        id: newCar.externalId,
        name: newCar.name,
        price: newCar.price,
      },
    });
  } catch (err) {
    console.error("addNewCar error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while adding car",
    });
  }
}

module.exports = addNewCar;
