const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Car = require("../Models/cars");

const MONGO_URI = process.env.MONGO_URI || process.env.DB_URL;

console.log("Running seed script from:", process.cwd());
console.log("Using Mongo URI present?", !!MONGO_URI);

if (!MONGO_URI) {
  console.error("No Mongo URI found. Set MONGO_URI or DB_URL in backend/.env");
  process.exit(1);
}

// Your static frontend data (same shape as your front)
const allCars = [
  {
    id: "1",
    name: "BMW 5 Series",
    type: "Luxury Sedan",
    price: 89,
    originalPrice: 99,
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.unsplash.com/photo-1656772119648-8fb884516e36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Auto", "5 Seats", "Premium"],
    specs: { seats: 5, transmission: "Automatic", fuel: "Gasoline" },
    available: true,
    category: "luxury",
  },
  {
    id: "2",
    name: "Tesla Model 3",
    type: "Electric Sedan",
    price: 75,
    originalPrice: 85,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1651544022918-92083a5b7d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Electric", "5 Seats", "Eco-Friendly"],
    specs: { seats: 5, transmission: "Automatic", fuel: "Electric" },
    available: true,
    category: "electric",
  },
  {
    id: "3",
    name: "Range Rover Sport",
    type: "Luxury SUV",
    price: 120,
    originalPrice: 135,
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1758411898310-ada9284a3086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["4WD", "7 Seats", "Premium"],
    specs: { seats: 7, transmission: "Automatic", fuel: "Gasoline" },
    available: true,
    category: "suv",
  },
  {
    id: "4",
    name: "Porsche 911",
    type: "Sports Car",
    price: 199,
    originalPrice: 220,
    rating: 5.0,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1594182283857-f7e4bdfdf356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Manual", "2 Seats", "Sports"],
    specs: { seats: 2, transmission: "Manual", fuel: "Gasoline" },
    available: false,
    category: "sports",
  },
  {
    id: "5",
    name: "Mercedes C-Class",
    type: "Luxury Sedan",
    price: 85,
    originalPrice: 95,
    rating: 4.7,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1648178326808-30e03de8049d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Auto", "5 Seats", "Premium"],
    specs: { seats: 5, transmission: "Automatic", fuel: "Gasoline" },
    available: true,
    category: "luxury",
  },
  {
    id: "6",
    name: "BMW X5",
    type: "Premium SUV",
    price: 110,
    originalPrice: 125,
    rating: 4.8,
    reviews: 134,
    image:
      "https://images.unsplash.com/photo-1758411898310-ada9284a3086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["4WD", "7 Seats", "Premium"],
    specs: { seats: 7, transmission: "Automatic", fuel: "Gasoline" },
    available: true,
    category: "suv",
  },
  {
    id: "7",
    name: "Audi A4 Convertible",
    type: "Convertible",
    price: 95,
    originalPrice: 105,
    rating: 4.6,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1656011475851-23f591606c0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Convertible", "4 Seats", "Premium"],
    specs: { seats: 4, transmission: "Automatic", fuel: "Gasoline" },
    available: true,
    category: "convertible",
  },
  {
    id: "8",
    name: "Tesla Model Y",
    type: "Electric SUV",
    price: 89,
    originalPrice: 99,
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1651544022918-92083a5b7d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Electric", "7 Seats", "Eco-Friendly"],
    specs: { seats: 7, transmission: "Automatic", fuel: "Electric" },
    available: true,
    category: "electric",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await Car.deleteMany({});
    console.log("Cleared existing cars");

    for (const c of allCars) {
      const doc = {
        externalId: String(c.id),
        name: c.name,
        type: c.type,
        category: c.category,
        price: c.price,
        originalPrice: c.originalPrice,
        ratingAverage: c.rating || 0,
        ratingCount: c.reviews || 0,
        thumbnail: c.image,
        images:
          c.images && c.images.length ? c.images : [c.image, c.image, c.image],
        features: c.features || [],
        specs: c.specs || {},
        available: typeof c.available === "boolean" ? c.available : true,
        description: c.description || "",
        location: c.location || "",
        included: c.included || [],
      };

      await Car.findOneAndUpdate({ externalId: doc.externalId }, doc, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });

      console.log(`🚗 Upserted ${doc.externalId} — ${doc.name}`);
    }

    console.log("Seeding finished.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

seed();
