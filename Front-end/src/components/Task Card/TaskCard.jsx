import './TaskCard.css'

function TaskCard(props) {

  return (
    <div className="task-div">
      <p id='title'>{props.title}</p>
      <p id='status'>{props.status}</p>
      <p id='deadline'>{props.deadline}</p>
    </div>
  )
}

export default TaskCard