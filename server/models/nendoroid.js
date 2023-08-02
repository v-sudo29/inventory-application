const mongoose = require('mongoose')

const NendoroidSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 1 },
  price: { type: String, required: true, default: 'N/A'},
  description: { type: String, required: true, default: 'Description is not available at this time.' }
})

module.exports = mongoose.model('Nendoroid', NendoroidSchema)