const express = require("express");
const {
  addUserDetails,
  getUserDetails,
  editUserDetails,
  deleteUserDetails,
  sendUserDetails,
} = require("../controllers/userDetails");

const router = express.Router();

router.get("/", getUserDetails);
router.post("/add", addUserDetails);
router.put("/edit/:id", editUserDetails);
router.delete("/delete/:id", deleteUserDetails);
router.post("/send", sendUserDetails);

module.exports = router;
