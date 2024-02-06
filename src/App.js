import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import UpdateTask from './components/UpdateTask';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState(null); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  useEffect(() => {
    axios
      .get('http://localhost:4000/tasks')
      .then((response) => {
        setTasks(response.data.tasks);
        setFilteredTasks(response.data.tasks);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  useEffect(() => {
    let filteredTasksByStatus = tasks;

    if (filterStatus !== 'All') {
      filteredTasksByStatus = tasks.filter((task) => task.status === filterStatus);
    }

    let finalFilteredTasks = filteredTasksByStatus;

    if (filterDate) {
      finalFilteredTasks = filteredTasksByStatus.filter((task) => task.due_date === filterDate);
    }

    setFilteredTasks(finalFilteredTasks);
  }, [tasks, filterStatus, filterDate]);

  const handleTaskAdded = (newTask) => {
    axios
      .post('http://localhost:4000/tasks', newTask)
      .then((response) => {
        setTasks([...tasks, response.data.task]);
        setFilteredTasks([...filteredTasks, response.data.task]);
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleTaskUpdated = (updatedTask) => {
    axios
      .put(`http://localhost:4000/tasks/${updatedTask._id}`, updatedTask)
      .then(() => {
        setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
        setFilteredTasks(filteredTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  const handleTaskDeleted = (taskId) => {
    axios
      .delete(`http://localhost:4000/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== taskId));
        setFilteredTasks(filteredTasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="app-container">
          <div className="sidebar"></div>
          <div className="main-content">
            <div className="header">
              <h1>Mon espace de travail</h1>
            </div>
            <div className="task-list-container">
              <AddTaskForm onTaskAdded={handleTaskAdded} />
              <div className="select-container">
                <label>Filtrer par statut</label>
                <select onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="All">Tous</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="select-container">
                <label>Filtrer par date</label>
                <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
              </div>
            </div>
            <TaskList tasks={filteredTasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} moveTask={moveTask} />
            <UpdateTask isOpen={modalIsOpen} toggle={toggleModal} onTaskUpdated={handleTaskUpdated} />
          </div>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
