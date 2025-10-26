import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load saved tasks from localStorage on page load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="app">
      <h1>{today}</h1>

      <div className="todo-container">
        {tasks.map((task, index) => (
          <div className="todo-item" key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              {task.text}
            </span>
          </div>
        ))}

        <div className="todo-input">
          <input
            type="text"
            placeholder="New Item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>+</button>
        </div>
      </div>

      <footer>Copyright 2025 The App Brewery</footer>
    </div>
  );
}

export default App;
