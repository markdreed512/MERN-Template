import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { uid } from 'uid'
import './App.css'

function App() {
  const [ title, setTitle ] = useState('')
  const [ complete, setComplete ] = useState(false)
  const [ todos, setTodos ] = useState(null)

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:4000/')
      const data = await response.json()
      console.log("todos:", data)
      setTodos(data)
    }

    fetchTodos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(title){
      const todo = { title,  complete}
      const response = await fetch('http://localhost:4000/', {
        method: "POST", 
        body: JSON.stringify(todo),
        headers: {
          'Content-type': 'application/json'
        }
      })
    }
  }
  const handleTitleChange = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }
  return (
    <>
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Enter Item" onChange={handleTitleChange} value={title}/>
        <input type="button" value="ADD" onClick={handleSubmit}/>
      </form>
     
      <ul className="todos">
        {
          todos && todos.map(todo => (
            <li key={uid()}>{todo.title}</li>
          ))
        }
      </ul>
    </>
  )
}

export default App
