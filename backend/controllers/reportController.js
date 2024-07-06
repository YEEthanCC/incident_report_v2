const Report = require('../models/reportModel')
const mongoose = require('mongoose')

const getReports = async(req, res) => {
    const reports = await Report.find({}).sort({createdAt: -1})
    res.status(200).json(reports)
}

const getReport = async(req, res) => {
    const { id } = req.params 
    const report = await Report.findById(id) 
    if(!report) {
        return res.status(404).json({error: 'No such report'})
    } 
    res.status(200).json(report)
}

const createReport = async(req, res) => {
    const { title, status, info, image_url, location } = req.body
    try {
        const report = await Report.create({title, status, info, image_url, location})
        res.status(200).json(report)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteReport = async(req, res) => {
    const { id } = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such report'})
    }
    const report = await Report.findOneAndDelete({_id: id}) 
    if(!report) {
        return res.status(300).json({error: 'No such report'})
    }
    res.status(200).json(report)
}

const updateReport = async(req, res) => {
    const { id } = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such report'})
    }
    const report = await Report.findByIdAndUpdate({_id: id}, {...req.body})
    res.status(200).json(report)
}

module.exports = {
    getReports, 
    getReport, 
    createReport, 
    deleteReport, 
    updateReport
}