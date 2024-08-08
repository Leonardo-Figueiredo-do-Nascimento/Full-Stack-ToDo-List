const service = require('./services/taskService')

exports.listTask = async (req, res) => {
    const tasks = service.getAllTasks()
    res.render('tasks/index', { tasks });
};

exports.createTask = async (req,res) => {
    const {title,status,deadline} = req.body
    service.createTask(title,status,deadline)
}

exports.updateTask = async (req,res) => {
    
}

