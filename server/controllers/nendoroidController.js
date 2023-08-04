const Nendoroid = require('../models/nendoroid')
const asyncHandler = require('express-async-handler');
const upload = require('../helpers/upload')
const path = require('path')
const fs = require('fs')

// GET list of all Nendoroids
exports.nendoroid_list = asyncHandler(async (req, res, next) => {
  const allNendoroids = await Nendoroid.find().exec()
  res.json(allNendoroids)
})

// GET detail of Nendoroid
exports.nendoroid_detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const nendoroidDetails = await Nendoroid.find({_id: id}).exec()
  res.json(nendoroidDetails)
})

// POST request to create new Nendoroid
exports.nendoroid_create_post = asyncHandler(async (req, res, next) => {
  Nendoroid.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.file.filename,
    units: req.body.units
  })
    .then(result => {
      res.json(result)
      console.log('Nendoroid saved to database')
    })
    .catch(err => res.json(err))
})

// POST request to update Nendoroid
exports.nendoroid_update_post = asyncHandler(async (req, res, next) => {
  const nendoroid = await Nendoroid.findById(req.params.id)
  let updatedNendoroid

  // Check if new file uploaded 
  if (!req.file) {
    updatedNendoroid = new Nendoroid ({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      units: req.body.units,
      imageUrl: nendoroid.imageUrl,
      _id: req.params.id // This is required,  or a new ID will be assigned
    })
  } else {
    // Add file to public dir (multer)
    upload.single('file')

    // Delete old image file from public dir
    const oldImgPath = path.join(__dirname, '../public', 'images', `${nendoroid.imageUrl}`)
    try {
      await fs.promises.unlink(oldImgPath)
    } catch (error) {
      console.log(error)
    }

    updatedNendoroid = new Nendoroid ({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      units: req.body.units,
      imageUrl: req.file.filename,
      _id: req.params.id // This is required,  or a new ID will be assigned
    })
  }
  const result = await Nendoroid.findByIdAndUpdate(req.params.id, updatedNendoroid, {})
  res.json(result)
})