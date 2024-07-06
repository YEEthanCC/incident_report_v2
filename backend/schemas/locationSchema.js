const mongoose = require('mongoose')
const { type } = require('os')

const Schema = mongoose.Schema

const locationSchema = new Schema({
    coordinates: {
        type: [Number], 
        required: true, 
    }, 
    name: {
        type: String, 
        required: false
    }
})

module.exports = locationSchema

