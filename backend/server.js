require('dotenv').config()

const express = require('express')
const locationRoutes = require('./routes/locations')
const reportRoutes = require('./routes/reports')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method) 
    next() 
})


app.use('/api/locations', locationRoutes)
app.use('/api/reports', reportRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db, listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
