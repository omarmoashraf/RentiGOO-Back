// routes/apiusers.js
const express = require("express");
const addUser = require("../controllers/Users/Adduser");
const getAllUser = require("../controllers/Users/getAllUser");
const getSingleUser = require("../controllers/Users/getSingleUser");
const updateUser = require("../controllers/Users/Updateuser");
const deleteUser = require("../controllers/Users/Deleteuser");

// Import middlewares from the merged auth.js
const { checkLogin, checkRole } = require("../MiddleWares/checklogin");

const router = express.Router();

// Create a new user
router.post("/", addUser);

// Get all users - any logged-in user
router.get("/all", checkLogin, getAllUser);

// Get single user - any logged-in user
router.get("/:id", checkLogin, getSingleUser);

// Update user - any logged-in user
router.put("/:id", checkLogin, updateUser);

// Delete user - only admin
router.delete("/:id", checkLogin, checkRole("admin"), deleteUser);

module.exports = router;
