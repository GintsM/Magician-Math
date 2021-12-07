import { useState } from 'react'

const AddTask = ({onAdd}) => {
  const [text, setText] = useState('')
  const [day, setday] = useState('')
  const [reminder, setReminder] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({text, day, reminder})
    setText('')
    setday('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Day</label>
        <input type='text' placeholder='Add Day and Time'value={day} onChange={(e) => setday(e.target.value)}/>
      </div>
      <div className='form-control form-control-check'>
        <label>Task</label>
        <input type='checkbox' value={reminder} onChange={(e) => setReminder(e.target.checked)}/>
      </div>
      <input type='submit' value='Save' className='btn btn-block'/>      
    </form>
  )
}

export default AddTask
