const express = require('express');
const cors = require('cors')
const server = express()
const taskRoutes = require("./routes/taskRoutes")
const port = process.env.PORT ||3000;

server.use(cors())
server.use(express.json())

server.use("/",taskRoutes)

server.listen(port,()=>{
    console.log("Server Online") 
})