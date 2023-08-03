const Nendoroid = require('../models/nendoroid')

const asyncHandler = require("express-async-handler");

// GET list of all Nendoroids
exports.nendoroid_list = asyncHandler(async (req, res, next) => {
  const allNendoroids = await Nendoroid.find().exec()
  res.json(allNendoroids)
})

// POST new Nendoroid
exports.nendoroid_create_post = asyncHandler(async (req, res, next) => {
  Nendoroid.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})