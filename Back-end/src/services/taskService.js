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
    //Adjusted for brazilian timezone
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0); // Definindo o início do dia em UTC

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // Definindo o final do dia em UTC

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
    const deadlineMoment = moment(newData.deadline, 'YYYY-MM-DD HH:mm:ss');
    newData.deadline = deadlineMoment.subtract(3, 'hours').toISOString();

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