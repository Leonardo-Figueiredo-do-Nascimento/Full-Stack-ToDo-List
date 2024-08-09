const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTask = async (title,status,deadline)=>{
    const task = await prisma.task.create({
        data: {
            title,
            status,
            deadline
          }
    })
    console.log('Task Registered:', task);
}
const getAllTasks = async () => {
    const tasks = await prisma.task.findMany();
    console.log('All tasks:', tasks);
    return tasks;
}

const updateTask = async (task_id,newData) => {
    const task = await prisma.task.update({
        where: { task_id: parseInt(task_id) },
        data: newData
    })
    console.log('Task Updated:', task);
}
const updateTaskStatus = async (task_id,status) => {
    const task = await prisma.task.update({
        where: { task_id: parseInt(task_id) },
        data: { status }
    })
    console.log('Task Updated:', task);
}

const deleteTask = async (task_id)=>{
    const task = await prisma.task.delete({
        where: { task_id: parseInt(task_id) }
    })
    console.log('Task Deleted:', task);
}

module.exports = {createTask,getAllTasks,updateTask,updateTaskStatus,deleteTask}