import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onTaskAdded }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'To Do',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the new task to the backend using Axios
    axios
      .post('http://localhost:4000/tasks', newTask)
      .then((response) => {
        onTaskAdded(response.data.task);
        setNewTask({
          title: '',
          description: '',
          due_date: '',
          status: 'To Do',
        });
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            style={styles.textarea}
          ></textarea>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={newTask.due_date}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <button type="submit" style={styles.button}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: '24px',
    marginBottom: '15px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: '8px',
    fontSize: '16px',
    minWidth: '100px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '8px',
    flex: 1,
  },
  textarea: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    resize: 'vertical',
    marginBottom: '8px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AddTaskForm;
