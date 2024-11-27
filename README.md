# O que é a Full-Stac To-Do List?
A Full-Stack To-Do List é minha versão aprimorada de um desafio de To-Do List. Essa lista funciona mais como uma agenda, permitindo que você selecione o dia para uma tarefa, dê um nome à tarefa que deseja realizar e defina um prazo para concluí-la. Além disso, há uma animação que é exibida caso você conclua ou não a tarefa dentro do prazo.


## Tecnologias Usadas 💻
  - Javascript
  - CSS
  - React.js
  - Node.js
  - Prisma
  - Postgresql

## Como Instalar
  git clone

### Front-end
  cd ./Full-Stack-ToDo-List/Front-end/
  
  npm install
  
  npm run dev

### Back-end
cd ./Full-Stack-ToDo-List/Back-end/

Crie um arquivo .env contendo "DATABASE_URL= URLdoSeuBancoDeDados"

npm install

npx prisma migrate dev

npx prisma generate

npm run nodemon

## Visão Geral

Para começar a usar esta lista de tarefas, você precisa selecionar o dia atual ou uma data futura. Em seguida, descreva a tarefa e defina um prazo. Depois disso, você pode concluir a tarefa, editá-la ou excluí-la.
Se você concluir a tarefa, uma animação verde será exibida; caso não consiga concluí-la, uma animação vermelha será mostrada. Após concluir ou não a tarefa, você não poderá mais editá-la ou excluí-la.
Além disso, é possível visualizar tarefas de dias anteriores.

## ---------------------------------------------------------------------------------------------------

# What is the Full-Stack To-Do List?
The Full-Stack To-Do List is my next level version of a To-Do list challenge, this To-Do list works more like an appoitment book, you can select the day you want to a task, 
name the task you are going to do and set the deadline to conclude the task, and there's an animation to whether you finish or fail to complete the task. 


## Technologies Used 💻
  - Javascript
  - CSS
  - React.js
  - Node.js
  - Prisma
  - Postgresql

## How to install
  git clone
### Front-end
  cd ./Full-Stack-ToDo-List/Front-end/
  
  npm install
  
  npm run dev

### Back-end
cd ./Full-Stack-ToDo-List/Back-end/

Create a .env file containing "DATABASE_URL= yourDatabaseURL"

npm install

npx prisma migrate dev

npx prisma generate

npm run nodemon

### Note: (You'll probably need to modify the backend functions because this list was developed based on the Brazilian time zone.)

## Overview
To start using this To-Do list, you need to select the current day or a future date. Then, you will describe the task and set a deadline. After that, you can either complete the task, 
edit it, or delete it. If you complete the task, a green animation will occur; if you fail to complete it, a red animation will happen. If you complete or fail to complete the task, you will not be able to edit or delete it afterward. 
You can also view tasks from previous days.

## Youtube Video
[To-Do List Working](https://youtu.be/rgj-jfDJczE)
