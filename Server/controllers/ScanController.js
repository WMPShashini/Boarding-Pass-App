const ScanState = require("../models/ScanState");
const countries = require("../data/Countries");

// Get random unused country
const getRandomCountry = async (req, res) => {
  try {
    let state = await ScanState.findOne();

    if (!state) {
      state = await ScanState.create({ usedCountries: [] });
    }

    // reset if all used
    if (state.usedCountries.length === countries.length) {
      state.usedCountries = [];
    }

    // filter available countries
    const available = countries.filter(
      c => !state.usedCountries.includes(c.name)
    );

    // pick random
    const random = available[Math.floor(Math.random() * available.length)];

    // update used list
    state.usedCountries.push(random.name);
    await state.save();

    res.json({
      country: random.name,
      image: random.image,
      message: `${random.name} - Welcome to destination`
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRandomCountry };