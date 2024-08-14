import './TaskCard.css'

function TaskCard(props) {

  const statusStyle = () =>{
    if(props.status === 'Completed'){
      return 'completed'
    } else if(props.status === 'Incomplete'){
      return 'incomplete'
    } else {
      return null
    };
  }

  return (
    <div className="task-div" id={`${statusStyle()}`}>
      <p id='title'>{props.title}</p>
      <p id='status'>{props.status}</p>
      <p id='deadline'>{props.deadline}</p>
    </div>
  )
}

export default TaskCard