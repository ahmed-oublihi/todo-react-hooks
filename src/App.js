import React, { useState, useCallback, useEffect } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello World</h1>
//     </div>
//   );
// }

const App = () => {
  // Hooks
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onNewTodoChanged = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmited = useCallback((event) => {
    event.preventDefault();

    if(!newTodo.trim()) return;

    setTodos([      
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false
      },
      ...todos
    ]);
    setNewTodo('');
  }, [newTodo, todos]);

  useEffect(() => {

  }, [todos]);

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  const markAllDone = useCallback(() => {
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true
      };
    });
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <div className="App container">
      <h2 className="heading center">My TODOS</h2>
      <form onSubmit={formSubmited}>
        <label htmlFor="newTodo">Enter a Todo</label>
        <input 
          id="newTodo"
          name="newTodo"
          value={newTodo} 
          onChange={onNewTodoChanged}
        />
        <button className="btn blue">Add a Todo</button>
      </form>
      <button className="btn"onClick={markAllDone}>Mark All Done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button className="btn red" onClick={removeTodo(todo)}>Remove</button>
          </li>
        ))}
        
      </ul>
    </div>
  )
}

export default App;
