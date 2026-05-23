const mongoose = require("mongoose");

const ScanStateSchema = new mongoose.Schema({
  usedCountries: [String],
});

module.exports = mongoose.model("ScanState", ScanStateSchema);