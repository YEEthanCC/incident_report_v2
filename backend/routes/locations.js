
const express = require('express')
const { 
  createLocation, 
  getLocations, 
  getLocation, 
  updateLocation,  
  deleteLocation
} = require('../controllers/locationController')

const Location = require('../models/locationModel')

const router = express.Router()

// GET all locations
router.get('/', getLocations)

// GET a single location
router.get('/:id', getLocation)

// POST a new locations
router.post('/', createLocation)

// DELETE a location
router.delete('/:id', deleteLocation)

// UPDATE a location
router.patch('/:id', updateLocation)

module.exports = router
