const express = require('express')
const router = express.Router()
const nendoroid_controller = require('../controllers/nendoroidController')

// GET home page, inventory list
router.get('/', nendoroid_controller.nendoroid_list)

// POST request for creating Nendoroid
router.post('/create', nendoroid_controller.nendoroid_create_post)

module.exports = router