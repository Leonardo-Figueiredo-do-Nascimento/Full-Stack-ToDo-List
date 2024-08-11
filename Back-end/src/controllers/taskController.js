const service = require('../services/taskService')

exports.listTask = async (req, res) => {
    try {
        const {deadline} = req.params
        const tasks = await service.getAllTasks(deadline)
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: error.message })   
    }
};

exports.createTask = async (req,res) => {
    try {
        const {title,status,deadline} = req.body
        const newTask = await service.createTask(title,status,deadline)
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message })   
    }
}

exports.updateTask = async (req,res) => {
    try {
        const {task_id} = req.params
        const updatedTask = await service.updateTask(task_id,req.body)
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message })   
    }
}

exports.updateTaskStatus = async (req,res) => {
    try {
        const {task_id,status} = req.params
        const updatedTask = await service.updateTaskStatus(task_id,status)
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message })   
    }
}

exports.deleteTask = async (req,res) => {
    try {
        const {task_id} = req.params
        await service.deleteTask(task_id)
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message })   
    }
}
