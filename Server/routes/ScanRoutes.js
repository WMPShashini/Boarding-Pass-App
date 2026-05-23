const express = require("express");
const router = express.Router();
const { getRandomCountry } = require("../controllers/ScanController");

router.get("/scan", getRandomCountry);

module.exports = router;