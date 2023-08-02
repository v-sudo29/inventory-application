const Nendoroid = require('../models/nendoroid')

const asyncHandler = require("express-async-handler");

// GET list of all Nendoroid home page
exports.nendoroid_list = asyncHandler(async (req, res, next) => {
  const allNendoroids = await Nendoroid.find().exec()
  res.json(allNendoroids)
})
