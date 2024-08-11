import { useState,useEffect } from 'react'
import Header from './components/Header/Header'
import TaskCard from './components/Task Card/TaskCard';
import axios from 'axios';
import config from './serverURL';
import './App.css'
const serverURL = config.serverAdress

function App() {

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskDeleted, setTaskDeleted] = useState(false);
  const [addTask,setAddTask] = useState(false)
  const [addButton,setAddButton] = useState(false)
  const [task,setTask] = useState()
  const [tasks,setTasks] = useState([])

  //useEffect to set new task
  useEffect(()=>{
    setTask(()=>{
      return {
        title: taskTitle,
        status: taskStatus,
        deadline: taskDate+" "+taskTime
      }
    })
  },[taskDate,taskTitle,taskTime,taskStatus])

  //useEffect to get tasks
  useEffect(()=>{
    async function getData() {
      try {
          const response = await axios.get(`${serverURL}${taskDate}`)
          setTasks(response.data)
      } catch (error) {
          console.log("Error: ", error)
      }
    }
    getData()
    setTaskDeleted(false)
  },[taskDate,task,taskDeleted])

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const currentDate = new Date();
    const selectedDateTime = new Date(`${taskDate}T${selectedTime}`);

    if (selectedDateTime < currentDate) {
      alert('You cannot select a time earlier than the current time.');
      setTaskTime(''); 
    } else {
      setTaskTime(selectedTime);
    }
  };
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = getCurrentDate();

    if (selectedDate < currentDate) {
      setTaskDate(''); 
      setAddTask(false)
      setAddButton(false)
    } else {
      setTaskDate(selectedDate);
      setTaskStatus("In Progress");
      setAddTask(true)
      setAddButton(true)
    }
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const registerTask = async (e) => {
    e.preventDefault()
    if(taskTitle!="" && taskTime!=""){
      console.log(task)
      try {
        const response = await axios.post(`${serverURL}`,task, {
          headers: {
              'Content-Type': 'application/json',
          }
        })
        if (response.status === 200) { 
            console.log("Task Created")
        } else {
            console.log('Register error:', response.data);
        }  
      } catch (error) {
        console.log(error)
      }
      setTaskTitle('');
      setTaskTime(''); 
      setTask()
      setAddTask(false)
    }
  }
  const deleteTask = async (taskId) => {
    const deleteConfirm = confirm("Are you sure you want to delete this task?")
    if(deleteConfirm){
      try {
        const response = await axios.delete(`${serverURL}${taskId}`)
        if (response.status === 200) { 
            console.log("Delete sucessfull")
            
        } else {
            console.log('Register error:', response.data);
        }  
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="main-div">
      <Header/>
      <div className="container">
          <input type="date" onChange={handleDateChange}/>
          
          {addTask ? (
            <form className="addTask-form" onSubmit={registerTask}>
              <h2>Fill the task fields</h2>
              <div className="task-fields-div">
                <div className='task-field'>
                  <label>Title:</label>
                  <input type="text" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>
                </div>
                <div className='task-field'>
                  <label>Time:</label>
                  <input type="time" onChange={handleTimeChange} />
                </div>
              </div>
              <input type="submit" value="ADD TASK" />
              <input type="button" value="Cancel" onClick={()=>{setAddTask(false)}}/>
            </form>
          ):(<></>)}
          {addButton ? (<input id='new-task' type="button" value="ADD NEW TASK" onClick={()=>setAddTask(true)}/>): (<></>)}
          {tasks.length>0 ? (
            <div className='tasks-container'>
              {
                tasks.map((task,index)=> (
                <div className='task-content'>
                  <TaskCard title={task.title} status={task.status} deadline={task.deadline.slice(-5)}/>
                  <button onClick={()=>setTaskStatus("Completed")}>Finish</button>
                  <button id='update-task-bt'><img src="../public/edit-icon.svg"/></button>
                  <button id='delete-task-bt' onClick={()=>{deleteTask(task.task_id); setTaskDeleted(true)}}><img src="../public/trash-icon.png"/></button>
                </div>  
                ))
              }
            </div>
            ): (<></>)
          }
          
      </div>
    </div>
  )
}

export default App
