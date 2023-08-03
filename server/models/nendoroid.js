const mongoose = require('mongoose')

const NendoroidSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 1 },
  price: { type: String, required: true, default: null },
  description: { type: String, required: true, default: null },
  imageUrl: { type: String, required: true, default: null },
  units: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('Nendoroid', NendoroidSchema)