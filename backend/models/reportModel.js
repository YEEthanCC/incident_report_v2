const mongoose = require('mongoose')
const { type } = require('os')
const locationSchema = require('../schemas/locationSchema')

const Schema = mongoose.Schema


const reportSchema = new Schema({
    title: {
        type: String, 
        required: false
    }, 
    status: {
        type: String, 
        required: true
    }, 
    info: {
        type: String, 
        required: false 
    }, 
    image_url: {
        type: String, 
        required: true 
    }, 
    location: {
        type: locationSchema, 
        required: true
    }, 
    user_id: {
        type: String, 
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Report', reportSchema)

