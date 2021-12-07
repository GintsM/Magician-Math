import Header from './components/Header'
import Tasks from './components/tasks'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'

function App() {
  const[showTask, setShowTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const fetchTasks = async() => {
    const response = await fetch('http://localhost:5000/tasks')
    return response.json()
  }

  const fetchRemind = async(id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
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
    const response = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const newTask = await response.json()
    setTasks([...tasks, newTask])   
  }

  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
    console.log(tasks)
  }

  const remainder = async(id) => {
    const taskRemaind = await fetchRemind(id);
    const updateReminder = {...taskRemaind, reminder: !taskRemaind.reminder}
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateReminder)
    })

    const data = await response.json();
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
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
