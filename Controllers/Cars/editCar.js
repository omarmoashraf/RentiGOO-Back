const Car = require("../../Models/cars");

async function editCar(req, res) {
  try {
    const { id } = req.params;
    const data = req.body || {};

    const existing = await Car.findOne({
      externalId: id,
      deletedAt: null,
    }).lean();
    if (!existing) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    if (data.name !== undefined) {
      if (typeof data.name !== "string" || !data.name.trim()) {
        return res.status(400).json({
          success: false,
          message: "If provided, name must be a non-empty string",
        });
      }
      data.name = data.name.trim();
    }

    if (data.price !== undefined) {
      if (isNaN(Number(data.price)) || Number(data.price) <= 0) {
        return res.status(400).json({
          success: false,
          message: "If provided, price must be a number > 0",
        });
      }
      data.price = Number(data.price);
    }

    const effectivePrice =
      data.price !== undefined ? Number(data.price) : existing.price;

    if (data.originalPrice !== undefined) {
      if (
        isNaN(Number(data.originalPrice)) ||
        Number(data.originalPrice) < effectivePrice
      ) {
        return res.status(400).json({
          success: false,
          message: "If provided, originalPrice must be >= price",
        });
      }
      data.originalPrice = Number(data.originalPrice);
    }

    const allowed = [
      "name",
      "type",
      "category",
      "price",
      "originalPrice",
      "features",
      "specs",
      "images",
      "thumbnail",
      "included",
      "available",
      "description",
      "location",
      "isPublished",
    ];
    const update = {};
    allowed.forEach((key) => {
      if (data[key] !== undefined) update[key] = data[key];
    });

    if (!update.thumbnail && update.images && update.images.length) {
      update.thumbnail = update.images[0];
    }

    const updated = await Car.findOneAndUpdate(
      { externalId: id, deletedAt: null },
      { $set: update },
      { new: true, lean: true }
    );

    if (!updated) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update car" });
    }

    const images =
      updated.images && updated.images.length
        ? updated.images
        : Array(3).fill(updated.thumbnail || "");
    const response = {
      id: updated.externalId || String(updated._id),
      name: updated.name,
      type: updated.type,
      category: updated.category,
      price: updated.price,
      originalPrice: updated.originalPrice,
      rating: updated.ratingAverage || 0,
      reviews: updated.ratingCount || 0,
      image: updated.thumbnail || images[0] || "",
      images,
      features: updated.features || [],
      specs: updated.specs || {},
      available:
        typeof updated.available === "boolean" ? updated.available : true,
      description: updated.description || "",
      location: updated.location || "",
      included: updated.included || [],
    };

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: response,
    });
  } catch (err) {
    console.error("editCar error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error while updating car" });
  }
}

module.exports = editCar;
