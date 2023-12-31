require('dotenv').config()
const Nendoroid = require('../models/nendoroid')
const asyncHandler = require('express-async-handler');
const upload = require('../helpers/upload')
const path = require('path')
const fs = require('fs')

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
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
      Key: nendoroid.imageName, // Image name of image we're trying to retrieve
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    nendoroid.imageUrl = url
  }
  res.json(allNendoroids)
})

// GET detail of Nendoroid
exports.nendoroid_detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const nendoroidDetails = await Nendoroid.findById(id).lean().exec()

  const getObjectParams = {
    Bucket: BUCKET_NAME,
    Key: nendoroidDetails.imageName, // Image name of image we're trying to retrieve
  }
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  nendoroidDetails.imageUrl = url

  res.json(nendoroidDetails)
})

// POST request to create new Nendoroid
exports.nendoroid_create_post = asyncHandler(async (req, res, next) => {
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
  const imageName = randomImageName()
  let updatedNendoroid

  // Check if new file uploaded 
  if (!req.file) {
    updatedNendoroid = new Nendoroid ({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      units: req.body.units,
      imageName: nendoroid.imageName,
      _id: req.params.id // This is required or a new ID will be assigned
    })
  } else {
    const newParams = {
      Bucket: BUCKET_NAME,
      Key: imageName, // Must be unique to prevent name collisions
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }

    const oldParams = {
      Bucket: BUCKET_NAME,
      Key: nendoroid.imageName
    }
  
    // Save image info to S3 bucket
    const command = new PutObjectCommand(newParams)
    await s3.send(command)

    // Delete prev image from S3
    const commandTwo = new DeleteObjectCommand(oldParams)
    await s3.send(commandTwo)

    // Update imageName in database
    updatedNendoroid = new Nendoroid ({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      units: req.body.units,
      imageName: imageName,
      _id: req.params.id // This is required,  or a new ID will be assigned
    })
  }
  const result = await Nendoroid.findByIdAndUpdate(req.params.id, updatedNendoroid, {})
  res.json(req.body)
  console.log(result)
})

// POST request to delete Nendoroid
exports.nendoroid_delete = asyncHandler(async (req, res, next) => {
  const nendoroid = await Nendoroid.findById(req.params.id)

  if (!nendoroid) {
    res.status(404).send('Nendoroid not found')
    return
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: nendoroid.imageName
  }

  try {
    // Delete image from s3
    const command = new DeleteObjectCommand(params)
    await s3.send(command)

    // Delete nendoroid from database
    const result = await Nendoroid.deleteOne({ _id: req.params.id })
    res.json(result)
    console.log('Deleted from S3 and Database!')
  } catch (err) {
    res.json(err)
    console.log(err)
  }
})