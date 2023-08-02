const express = require('express')
const router = express.Router()
const nendoroid_controller = require('../controllers/nendoroidController')

// GET home page, inventory list
router.get('/', nendoroid_controller.nendoroid_list)

module.exports = router