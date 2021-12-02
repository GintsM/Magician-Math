import Header from './components/Header'
import Tasks from './components/tasks'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'

// I can import thing to this file and use as variables
function App() {
  const[showTask, setShowTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const fetchTasks = async() => {
    const response = await fetch('http://localhost:3004/api/tasks')
    return response.json()
  }

  useEffect(() => {
    const getTasks = async() => {
      const taskServer = await fetchTasks()
      setTasks(taskServer)
    }
    getTasks()
  })


  const addTask = async(task) => {
    const response = await fetch(`http://localhost:3004/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const newTask = await response.json()

    setTasks([...tasks, newTask])
    // const id = Math.floor(Math.random()*100)+1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask])    
  }

  //event check for delete
  const deleteTask = async(id) => {
    await fetch(`http://localhost:3004/api/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const remainder = async(id) => {
    const taskRemaind = await fetch(`http://localhost:3004/api/tasks/${id}`)
    const updateReminder = {...taskRemaind, reminder: !taskRemaind.reminder}
    const response = await fetch(`http://localhost:3004/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateReminder)
    })
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: response.json().reminder} : task))
  }



  return (
    <div className="container">
      <Header onShow={() => {setShowTask(!showTask)}} onOpen={showTask}/>
      {showTask && (<AddTask onAdd={addTask}/>)}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete = {deleteTask} onRemaind = {remainder}/>) : 'No Tasks to do'}      
    </div>
  );
}


export default App;
