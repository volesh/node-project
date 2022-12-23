const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const { envsConfig } = require("./src/configs");
const apiRouter = require('./src/routers/apiRouter')
const {cronRunner} = require("./src/crones");

mongoose.set({strictQuery: false})
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(fileUpload())

app.use(apiRouter)

//Опрацювання помилок
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        errorMessage: err.message || 'Unknown error',
        statusCode: err.status || 500
    })
})

app.listen(envsConfig.PORT, async ()=>{
    await mongoose.connect(envsConfig.MONGO_SERVER)
    console.log('working')
    cronRunner()
})
