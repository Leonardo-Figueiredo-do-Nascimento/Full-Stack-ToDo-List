const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newTask = await prisma.task.create({
    data: {
      title: 'My first task',
      status: 'Completed',
      deadline: new Date('2024-12-31T23:59:59.999Z') // Exemplo de data
    }
  });
  console.log(newTask);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });