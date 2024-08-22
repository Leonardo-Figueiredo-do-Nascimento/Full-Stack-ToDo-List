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
