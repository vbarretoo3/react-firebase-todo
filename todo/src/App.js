import './App.css';
import React, {useEffect, useRef, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';

function App() {
  const Local_Storage_Key = "todoapp.todo"
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(Local_Storage_Key))
    if (storedTodos) setTodos(storedTodos) 
  }, [])

  useEffect(() => {
    localStorage.setItem(Local_Storage_Key, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {
        id: uuidv4(), name: name, complete: false

      }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>To-Do List</h1>
          <TodoList todos={todos} toggleTodo={toggleTodo} className="Todo-List"/>
          <form>
            <label>Add your To-do:</label>
            <input ref={todoNameRef} type="text"/><br/>
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={handleClearTodos}>Clear Todo</button>
          </form>
          <div>{todos.filter(todo => !todo.complete).length} left to do</div>
          <a href='https://counter-344ed.web.app/'>Counter App</a>
        </header>
      </div>
    </>
  );
}

export default App;
