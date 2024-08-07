const express = require('express');
const cors = require('cors')
const server = express()

const port = process.env.PORT ||3000;

server.use(cors())
server.use(express.json())

