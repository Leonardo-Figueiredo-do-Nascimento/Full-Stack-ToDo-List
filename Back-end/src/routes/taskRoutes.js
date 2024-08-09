const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router()

router.get("/",taskController.listTask)
router.post("/",taskController.createTask)
router.put("/:task_id",taskController.updateTask)
router.put("/:task_id/status/:status",taskController.updateTaskStatus)
router.delete('/:task_id',taskController.deleteTask)

module.exports = router;