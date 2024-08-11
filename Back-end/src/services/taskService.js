const { PrismaClient } = require('@prisma/client');
const moment = require("moment-timezone")
const prisma = new PrismaClient();

const createTask = async (title,status,deadline)=>{

    const deadlineMoment = moment(deadline, 'YYYY-MM-DD HH:mm:ss');

    // Subtract 3 hours from the parsed time to represent the manually represent brazilian timezone
    const adjustedBRTDeadline = deadlineMoment.subtract(3, 'hours').toISOString();

    const task = await prisma.task.create({
        data: {
            title,
            status,
            deadline: adjustedBRTDeadline
          }
    })
    console.log('Task Registered:', task);
}
const getAllTasks = async (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59);

    const tasks = await prisma.task.findMany({
        where: {
            deadline: {
                gte: startOfDay, // greater than or equal to the start of the day
                lte: endOfDay   // less than or equal to the end of the day
            }
        }
    });
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