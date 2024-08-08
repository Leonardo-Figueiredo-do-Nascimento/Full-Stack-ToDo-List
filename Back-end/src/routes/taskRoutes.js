const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router()

router.get("/",taskController.listTask)
router.post("/",taskController.createTask)
router.put("/",taskController.updateTask)
router.delete('/',taskController.deleteTask)

module.exports = router;