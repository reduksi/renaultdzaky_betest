require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routers')
const errorHandler = require('./middleware/errorHandler')

const mongoose = require('mongoose');
mongoose.connect(process.env.database_url || 'mongodb://localhost:27017/db_renaultdzaky_betest');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)
app.get('/', (req, res, next) => {
    res.status(200).json({msg : 'API Ready!'})
})
app.use(errorHandler)
app.listen(port)

module.exports = app