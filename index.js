require('dotenv').config()
// dotenv na install cheyth config cheythu to access envyil ullathina globally application fully access cheyan vendi annu dotenv fileil akkunath
const express = require("express")
const cors  = require('cors')
require('./dbConfig')
const router = require('./routes')

const server = new express()
server.use(cors())
server.use(express.json())
// built in middleware function in express. it serves static files and is based on serve-statics.
server.use('/uploads',express.static('./uploads'))
server.use(router)
const Port = 3000

server.listen(Port,()=>{
    console.log("server is successfully running in ",Port)
})
