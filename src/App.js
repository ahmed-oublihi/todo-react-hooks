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
    <div className="App">
      <form onSubmit={formSubmited}>
        <label htmlFor="newTodo">Enter a Todo</label>
        <input 
          id="newTodo"
          name="newTodo"
          value={newTodo} 
          onChange={onNewTodoChanged}
        />
        <button>Add a Todo</button>
      </form>
      <button onClick={markAllDone}>Mark All Done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove</button>
          </li>
        ))}
        
      </ul>
    </div>
  )
}

export default App;



// import React, { useState, useCallback, useEffect } from 'react';

// import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
// import Checkbox from '@material-ui/core/Checkbox';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';




// // function App() {
// //   return (
// //     <div className="App">
// //       <h1>Hello World</h1>
// //     </div>
// //   );
// // }

// const App = () => {
//   // Hooks
//   const [newTodo, setNewTodo] = useState('');
//   const [todos, setTodos] = useState([]);

//   const onNewTodoChanged = useCallback((event) => {
//     setNewTodo(event.target.value);
//   }, []);

//   const formSubmited = useCallback((event) => {
//     event.preventDefault();

//     if(!newTodo.trim()) return;

//     setTodos([      
//       {
//         id: todos.length ? todos[0].id + 1 : 1,
//         content: newTodo,
//         done: false
//       },
//       ...todos
//     ]);
//     setNewTodo('');
//   }, [newTodo, todos]);

//   useEffect(() => {

//   }, [todos]);

//   const addTodo = useCallback((todo, index) => (event) => {
//     const newTodos = [...todos];
//     newTodos.splice(index, 1, {
//       ...todo,
//       done: !todo.done
//     });
//     setTodos(newTodos);
//   }, [todos]);

//   const removeTodo = useCallback((todo) => (event) => {
//     setTodos(todos.filter(otherTodo => otherTodo !== todo));
//   }, [todos]);

//   const markAllDone = useCallback(() => {
//     const updatedTodos = todos.map(todo => {
//       return {
//         ...todo,
//         done: true
//       };
//     });
//     setTodos(updatedTodos);
//   }, [todos]);

//   return (
//     <div className="App">
//       <CssBaseline />
//       <Container fixed>
//       <form onSubmit={formSubmited}>
//         <label htmlFor="newTodo">Enter a Todo</label>
//         <TextField 
//           id="newTodo"
//           name="newTodo"
//           value={newTodo} 
//           onChange={onNewTodoChanged}
//         />
//         <Button>Add a Todo</Button>
//       </form>
//       <Button  variant="contained" color="primary" onClick={markAllDone}>Mark All Done</Button >
//       <List>
//         {todos.map((todo, index) => (
//           <ListItem  key={todo.id}>
//             <Checkbox
//               checked={todo.done}
//               type="checkbox"
//               onChange={addTodo(todo, index)}
//               color="primary"
//               inputProps={{ 'aria-label': 'secondary checkbox' }}
//             />
//             <span className={todo.done ? 'done' : ''}>{todo.content}</span>
//             <Button 
//               variant="outlined"
//               onClick={removeTodo(todo)}>Remove
//             </Button>
//           </ListItem >
//         ))}
        
//       </List>
//       </Container>
//     </div>
//   )
// }

// export default App;
