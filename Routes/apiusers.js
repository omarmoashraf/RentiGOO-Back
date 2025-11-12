// user routes
const express = require("express");
const addUser = require("../Controllers/Users/Adduser")
const getAllUser = require("../controllers/Users/getAllUser");
const getSingleUser = require("../controllers/Users/getSingleUser");
const updateUser = require("../Controllers/Users/Updateuser");
const deleteUser = require("../Controllers/Users/Deleteuser");
const checkLogin = require("../MiddleWares/checklogin");
const checkRole = require("../MiddleWares/checklogin");

const router = express.Router();
router.post("/", addUser);
router.get("/all", checkLogin, getAllUser);  // any logged-in user can see

router.get("/:id", checkLogin, getSingleUser); // any logged-in user can see

router.put("/:id", checkLogin, updateUser); // user can update any logged-in

router.delete("/:id", checkLogin, checkRole("admin"), deleteUser);  // only admin can delete user

module.exports = router;
