const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTask = (title,status,limit_date)=>{
    prisma.task.create({
        data: {
            title,
            status,
            limit_date
          }
    })
}

module.exports = {createTask}