import { useState,useEffect } from 'react'
import Header from './components/Header/Header'
import TaskCard from './components/Task Card/TaskCard';
import axios from 'axios';
import moment from 'moment-timezone';
import config from './serverURL';
import './App.css'
const serverURL = config.serverAdress

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskDeleted, setTaskDeleted] = useState(false);
  const [updateTaskForm, setUpdateTaskForm] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [completed,setCompleted] = useState(false)
  const [incomplete,setIncomplete] = useState(false)
  const [addTask,setAddTask] = useState(false)
  const [addButton,setAddButton] = useState(false)
  const [task,setTask] = useState()
  const [tasks,setTasks] = useState([])

  //useEffect to get current time and update tasks to unfinished if not completed
  useEffect(()=>{
    const intervalId = setInterval(async () => {
      const currentTime = moment().tz('UTC');
      await Promise.all(tasks.map(async (task) => {
        const deadline = moment(task.deadline).tz('UTC').add(3,'hours');
        if ((deadline.toDate()<currentTime.toDate()) && task.status !== "Completed" && task.status !== "Incomplete") {
          try {
            const response = await axios.put(
              `${serverURL}${task.task_id}/status/Incomplete`,
              {},
              {
                headers: {
                  'Content-Type': 'application/json',
                }
              }
            );
            if (response.status === 200) {
              console.log("Task Incomplete");
              console.log(deadline)
              console.log(deadline.toDate())
              setIncomplete(true)
            } else {
              console.log('Update error:', response.data);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }));
      console.log(currentTime.toDate());
    }, 1000);
    return () => clearInterval(intervalId);
  },[tasks])

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
    setCompleted(false)
    setIncomplete(false)
  },[taskDate,task,taskDeleted,updateTaskForm,completed,incomplete])

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
  const updateForm = ()=>{
    return (
      <div className='updateTask'>
        <form className="updateTask-form" onSubmit={(e) => updateTask(e, updateId)}>
          <h2>Update the task fields</h2>
          <div className="task-fields-div">
            <div className='task-field'>
              <label>Title:</label>
              <input type="text" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>
            </div>
            <div className='task-field'>
              <label>Time:</label>
              <input type="time" value={taskTime} onChange={handleTimeChange} />
            </div>
          </div>
          <input type="submit" value="UPDATE TASK" />
          <input type="button" value="Cancel" onClick={()=>{setUpdateTaskForm(false)}}/>
        </form>
      </div>
    )
  }
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
  const completeTask = async (e,task_id) =>{
    e.preventDefault()
    try {
      const response = await axios.put(`${serverURL}${task_id}/status/${"Completed"}`,{
        headers: {
            'Content-Type': 'application/json',
        }
      })
      if (response.status === 200) { 
        console.log("Task Completed")
        setCompleted(true)
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const updateTask = async (e,taskId) =>{
    e.preventDefault()
    setTaskStatus("In Progress");
    try {
      const response = await axios.put(`${serverURL}${taskId}`,task, {
        headers: {
            'Content-Type': 'application/json',
        }
      })
      if (response.status === 200) { 
        console.log("Task Update")
        setUpdateTaskForm(false)
      } else {
        console.log('Update error:', response.data);
      }
    } catch (error) {
      console.log('Error:', error);
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
          {updateTaskForm ? updateForm() : (<></>)}
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
                tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).map((task,index)=> (
                <div className='task-content'>
                  <TaskCard title={task.title} status={task.status} deadline={task.deadline.slice(11,16)}/>
                  { task.status=="In Progress" ? (
                    <>
                      <button onClick={(e)=>completeTask(e,task.task_id)}>Finish</button>
                      <button id='update-task-bt' onClick={()=>{setUpdateTaskForm(true);setUpdateId(task.task_id);setTaskTitle(task.title);setTaskTime(task.deadline.slice(11,16))}}><img src="../public/edit-icon.svg"/></button>
                      <button id='delete-task-bt' onClick={()=>{deleteTask(task.task_id); setTaskDeleted(true)}}><img src="../public/trash-icon.png"/></button>
                    </>
                    ):(<></>)
                  }
                  
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
