const service = require('./services/taskService')

exports.listTask = async (req, res) => {
    try {
        const tasks = service.getAllTasks()
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
        const {task_id} = req.body
        const updatedTask = await service.updateTask(task_id,req.body)
        res.status(201).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message })   
    }
}

exports.deleteTask = async (req,res) => {
    try {
        const {task_id} = req.body
        const deleteTask = await service.deleteTask(task_id)
        res.status(200).json(deleteTask);
    } catch (error) {
        res.status(500).json({ error: error.message })   
    }
}
