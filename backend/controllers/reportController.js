const Report = require('../models/reportModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const getReports = async(req, res) => {
    const reports = await Report.find({}).sort({createdAt: -1})
    let token 
    let userId
    if(req.get('Authorization')) {
        token = req.get('Authorization').split(' ')[1]
        try {
            let payload = jwt.verify(token, process.env.SECRET)
            userId = payload._id
        } catch (error) {

        }
    } 
    const authReports = reports.map(r => {
        let authorization = false; 
        if(userId && r.user_id.toString() === userId) {
            authorization = true
        }
        r = r.toObject()
        r.authorization = authorization
        return r
    })
    res.status(200).json(authReports)
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
    const { title, status, info, image_url, location, user_id } = req.body
    try {
        const report = await Report.create({title, status, info, image_url, location, user_id})
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
    let report = await Report.findById(id) 
    // const report = await Report.findOneAndDelete({_id: id}) 
    if(!report) {
        return res.status(300).json({error: 'No such report'})
    }
    if(report.user_id != req.body.user_id) {
        return res.status(401).json({error: 'Unauthorized user'})
    }
    report = await Report.findOneAndDelete({_id: id}) 
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