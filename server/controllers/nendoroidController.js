const Nendoroid = require('../models/nendoroid')

const asyncHandler = require("express-async-handler");

// Display list of all Nendoroid
exports.nendoroid_list = asyncHandler(async (req, res, next) => {
  const allNendoroids = await Nendoroid.find().exec()
  res.json(allNendoroids)
})
