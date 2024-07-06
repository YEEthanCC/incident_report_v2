const Location = require('../models/locationModel')
const mongoose = require('mongoose')

const getLocations = async(req, res) => {
    const locations = await Location.find({}).sort({createdAt: -1})
    res.status(200).json(locations)
}

const getLocation = async(req, res) => {
    const { id } = req.params 
    const location = await Location.findById(id) 
    if(!location) {
        return res.status(404).json({error: 'No such location'})
    } 
    res.status(200).json(location)
}

const createLocation = async(req, res) => {
    const { coordinates, name } = req.body
    try {
        const location = await Location.create({coordinates, name })
        res.status(200).json(location)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteLocation = async(req, res) => {
    const { id } = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such location'})
    }
    const location = await Location.findOneAndDelete({_id: id}) 
    if(!location) {
        return res.status(300).json({error: 'No such location'})
    }
    res.status(400).json(location)
}

const updateLocation = async(req, res) => {
    const { id } = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such location'})
    }
    const location = await Location.findByIdAndUpdate({_id: id}, {...req.body})
    res.status(200).json(location)
}

module.exports = {
    getLocations, 
    getLocation, 
    createLocation, 
    deleteLocation, 
    updateLocation
}