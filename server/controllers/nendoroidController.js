require('dotenv').config()
const Nendoroid = require('../models/nendoroid')
const asyncHandler = require('express-async-handler');
const upload = require('../helpers/upload')
const path = require('path')
const fs = require('fs')

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const crypto = require('crypto')

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: BUCKET_REGION
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

// GET list of all Nendoroids
exports.nendoroid_list = asyncHandler(async (req, res, next) => {
  const allNendoroids = await Nendoroid.find().lean().exec() // lean() returns JS Objects instead of Mongoose documents

  for (let nendoroid of allNendoroids) {
    const getObjectParams = {
      Bucket: BUCKET_NAME,
      Key: nendoroid.imageName ? nendoroid.imageName : 'hi', // Image name of image we're trying to retrieve
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    nendoroid.imageUrl = url
  }
  console.log(allNendoroids)
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
  console.log(req.file.buffer)

  const imageName = randomImageName()
  const params = {
    Bucket: BUCKET_NAME,
    Key: imageName, // Must be unique to prevent name collisions
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }

  // Save image to S3 bucket
  const command = new PutObjectCommand(params)
  await s3.send(command)

  // Save info to database
  try {
    const nendoroidInfo = await Nendoroid.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageName: imageName,
      units: req.body.units
    })
    res.json(nendoroidInfo)
    console.log('Nendoroid saved to Database')
  } catch (err) {
    res.json(err)
    console.log('Nendoroid not saved to Database')
  }
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

// POST request to delete Nendoroid
exports.nendoroid_delete = asyncHandler(async (req, res, next) => {
  const result = await Nendoroid.deleteOne({ _id: req.params.id })

  // Delete old image file from public dir
  const oldImgPath = path.join(__dirname, '../public', 'images', `${req.body.imagePath}`)
  try {
    await fs.promises.unlink(oldImgPath)
  } catch (error) {
    console.log(error)
  }
  console.log(result && 'Deleted Nendoroid!')
  res.json('Deleted!')
})