import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css"; // 引入CSS
import StarRating from './StarRating'; // 引入StarRating元件

function App() {
  const [tasks, setTasks] = useState([]); // 用來保存待辦事項
  const [newTask, setNewTask] = useState(""); // 保存新輸入的待辦事項

  // 新增任務
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]); // 將新任務加入清單
      setNewTask(""); // 清空輸入欄
    }
  };

  // 標記任務為完成
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // 刪除任務
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList tasks={tasks} newTask={newTask} setNewTask={setNewTask} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} />} />
        <Route path="/task/:id" element={<TaskDetail tasks={tasks} />} />
      </Routes>
    </Router>
  );
}

function TaskList({ tasks, newTask, setNewTask, addTask, toggleTask, deleteTask }) {
  return (
    <div className="App">
      <h1>待辦清單</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="新增待辦事項"
      />
      <button onClick={addTask}>新增</button>
      <table>
        <thead>
          <tr>
            <th>任務</th>
            <th>狀態</th>
            <th>評分</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>
                <Link
                  to={`/task/${index}`}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </Link>
              </td>
              <td>
                <button
                  className={
                    task.completed ? "completeButton" : "incompleteButton"
                  }
                  onClick={() => toggleTask(index)}
                >
                  {task.completed ? "完成" : "執行中"}
                </button>
              </td>
              <td className="star-rating">
                <StarRating />
              </td>
              <td>
                <button
                  className="deleteButton"
                  onClick={() => deleteTask(index)}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TaskDetail({ tasks }) {
  const { id } = useParams();
  const task = tasks[id];

  if (!task) {
    return <div>任務未找到</div>;
  }

  return (
    <div>
      <h2>任務詳細資訊</h2>
      <p>{task.text}</p>
      <Link to="/">
        <button className="back-btn">back</button>
      </Link>
    </div>
  );
}

export default App;