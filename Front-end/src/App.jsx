import { useState,useEffect } from 'react'
import Header from './components/Header/Header'
import './App.css'

function App() {

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [task,setTask] = useState()

  //useEffect to set new task
  useEffect(()=>{
    setTask(()=>{
      return {
        title: taskTitle,
        status: "In Progress",
        deadline: taskTime
      }
    })
  },[taskDate,taskTitle,taskTime])

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
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="main-div">
      <Header/>
      <div className="container">
          <input type="date" onChange={(e)=>setTaskDate(e.target.value)} min={getCurrentDate()}/>
          
          {taskDate!='' ? (<form className="addTask-form" onSubmit={()=>{}}>
            <h2>Fill the task fields</h2>
            <div className="task-fields-div">
              <div className='task-field'>
                <label>Title:</label>
                <input type="text"/>
              </div>
              <div className='task-field'>
                <label>Time:</label>
                <input type="time" onChange={handleTimeChange} />
              </div>
            </div>
          </form>):(<></>)}
      </div>
    </div>
  )
}

export default App
