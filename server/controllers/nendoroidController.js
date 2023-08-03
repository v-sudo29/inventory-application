const Nendoroid = require('../models/nendoroid')
const asyncHandler = require("express-async-handler");

// GET list of all Nendoroids
exports.nendoroid_list = asyncHandler(async (req, res, next) => {
  const allNendoroids = await Nendoroid.find().exec()
  res.json(allNendoroids)
})

// POST request to create new Nendoroid
exports.nendoroid_create_post = asyncHandler(async (req, res, next) => {
  Nendoroid.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.file.filename
  })
    .then(result => {
      res.json(result)
      console.log('Nendoroid saved to database')
    })
    .catch(err => res.json(err))
})