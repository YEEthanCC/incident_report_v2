const mongoose = require('mongoose')
const { type } = require('os')

const locationSchema = require('../schemas/locationSchema')

module.exports = mongoose.model('Location', locationSchema)

