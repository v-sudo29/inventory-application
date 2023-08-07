const express = require('express')
const upload = require('../helpers/upload')
const router = express.Router()
const nendoroid_controller = require('../controllers/nendoroidController')

// GET home page, inventory list
router.get('/', nendoroid_controller.nendoroid_list)

// GET nendoroid detail
router.get('/nendoroid/:id', nendoroid_controller.nendoroid_detail)

// POST request for updating Nendoroid
router.post('/nendoroid/:id/update', nendoroid_controller.nendoroid_update_post)

// POST request for creating Nendoroid
router.post('/create', upload.single('file'),  nendoroid_controller.nendoroid_create_post)

// DELETE request to remove Nendoroid
router.delete('/nendoroid/:id/delete', nendoroid_controller.nendoroid_delete)

module.exports = router