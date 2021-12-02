import Task from './Task'

const Tasks = ({tasks, onDelete, onRemaind}) => {  
  return (
    <>
      {tasks.map((task) => (<Task
       key={task.id}
       task={task}
       onDelete={onDelete}
       onRemaind={onRemaind}
       />
       ))}
    </>
  )
}

export default Tasks
