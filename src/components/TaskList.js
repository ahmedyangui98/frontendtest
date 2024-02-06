
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted, moveTask }) => {
  const handleMoveTask = (fromIndex, toIndex) => {
    moveTask(fromIndex, toIndex);
  };

  return (
    <div className="task-list">
      
      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={task._id}
            task={task}
            index={index}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
            moveTask={handleMoveTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
