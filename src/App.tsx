import { useEffect, useState } from "react";
import "./App.css";

interface Todo {
  id: string;
  content: string;
}

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  // Cargar todos del localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  // Guardar en localStorage cada vez que cambian los todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        content: content
      };
      setTodos([...todos, newTodo]);
    }
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.content}
            <button onClick={() => deleteTodo(todo.id)} style={{marginLeft: '10px'}}>
              ❌
            </button>
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted on AWS Amplify!
        <br />
        Your todos are saved in localStorage.
      </div>
    </main>
  );
}

export default App;
