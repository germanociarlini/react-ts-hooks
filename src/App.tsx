import React, { Fragment, useState } from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>

interface Todo {
  text: string,
  complete: boolean,
}

function App() {

  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])

  const handleSubmit = (e: FormElement) => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string) => {
    setTodos([...todos, { text, complete: false }])
  }

  const completeTodo = (todoIndex: number) => {
    const updatedTodos = [...todos]
    updatedTodos[todoIndex].complete = !updatedTodos[todoIndex].complete
    setTodos(updatedTodos)
  }

  const removeTodo = (todoIndex: number) => {
    const updatedTodos = [...todos]
    updatedTodos.splice(todoIndex, 1)
    setTodos(updatedTodos)
  }

  return (
    <div className="App">
      <Fragment>
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' value={value} onChange={e => setValue(e.target.value)} required></input>
          <button type='submit'>Add Todo</button>
        </form>
        <section>
          {todos.map((todo: Todo, i: number) =>
            <Fragment key={i}>
              <div style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.text}</div>
              <button type='button' onClick={() => completeTodo(i)}>
                {todo.complete ? '✔️' : '❌'}
              </button>
              <button type='button' onClick={() => removeTodo(i)}>
                🗑️
              </button>
            </Fragment>
          )}
        </section>
      </Fragment>
    </div>
  );
}

export default App;
