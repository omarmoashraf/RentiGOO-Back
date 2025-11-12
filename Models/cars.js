const mongoose = require("mongoose");
const { Schema } = mongoose;

const SpecsSchema = new Schema(
  {
    make: { type: String },
    seats: { type: Number, min: 1 },
    doors: { type: Number },
    transmission: { type: String },
    engine: { type: String },
    fuel: { type: String },
    mileage: { type: String },
    luggage: { type: String },
  },
  { _id: false }
);

const CarSchema = new Schema(
  {
    externalId: { type: String, index: true },
    name: { type: String, required: true },
    type: { type: String },
    category: { type: String, index: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    thumbnail: { type: String }, // main image
    images: [{ type: String }], // gallery images
    features: [{ type: String }],
    specs: { type: SpecsSchema, default: {} },
    available: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    description: { type: String },
    location: { type: String },
    included: [{ type: String }],
  },
  { timestamps: true }
);

CarSchema.index({
  name: "text",
  type: "text",
  category: "text",
  features: "text",
});

module.exports = mongoose.model("Car", CarSchema);
