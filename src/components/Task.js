import { FaTimes } from 'react-icons/fa'

const Task = ({task, onDelete, onRemaind}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={() => onRemaind(task.id)} >
      <h3>{task.text} <FaTimes onClick ={() => onDelete(task.id)}/></h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
