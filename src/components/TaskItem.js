import React, { useState } from 'react';
import { Button, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import UpdateTask from './UpdateTask'; 

function TaskItem({ task, index, onTaskUpdated, onTaskDeleted, moveTask, onShowUpdateTask }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const getColorForLetter = (letter) => {
    const colors = {
      A: 'blue',
      B: 'green',
      C: 'red',
      D: 'purple',
      E: 'orange',
      F: 'cyan',
      G: 'magenta',
      H: 'yellow',
      I: 'indigo',
      J: 'violet',
      K: 'brown',
      L: 'pink',
      M: 'teal',
      N: 'lime',
      O: 'olive',
      P: 'navy',
      Q: 'maroon',
      R: 'coral',
      S: 'gold',
      T: 'slateblue',
      U: 'peru',
      V: 'turquoise',
      W: 'darkcyan',
      X: 'darkgoldenrod',
      Y: 'darkorchid',
      Z: 'darkred',
    };

    const defaultColor = 'gray';
    return colors[letter.toUpperCase()] || defaultColor;
  };

  const handleUpdateStatus = (newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    onTaskUpdated(updatedTask);
    setIsDropdownOpen(false);
  };

  const handleDeleteTask = () => {
    onTaskDeleted(task._id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'LightPink';
      case 'In Progress':
        return 'Khaki';
      case 'Done':
        return 'LightGreen';
      default:
        return 'gray';
    }
  };

  const taskStyle = {
    border: `2px solid ${getStatusColor(task.status)}`,
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: '10px',
    overflow: 'hidden',
    width: '200px',
    marginBottom: '10px',
    padding: '10px',
    position: 'relative',
  };

  const squareStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: getColorForLetter(task.title.charAt(0)),
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '20px',
    position: 'absolute',
    top: '10px',
    left: '10px',
  };

  const statusButtonStyle = {
    backgroundColor: getStatusColor(task.status),
    color: 'black',
    border: 'none',
    borderRadius: '8px',
    marginBottom: '5px',
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const cardTextStyle = {
    maxHeight: '70px',
    overflowY: 'auto',
  };

  const deleteButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    marginBottom: '5px',
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const arrowStyle = {
    marginLeft: '5px',
  };

  const toggleUpdateModal = () => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  return (
    <div className="task-item" style={taskStyle} ref={(node) => drag(drop(node))}>
      <div style={squareStyle}>{task.title.charAt(0)}</div>
      <div style={{ marginLeft: '60px' }}>
        <strong>{task.title}</strong>
        <CardText className="task-description" style={cardTextStyle}>
          {task.description}
        </CardText>
        <p>Date : {task.due_date}</p>
        <Button style={statusButtonStyle} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {task.status} <span style={arrowStyle}>&#9660;</span>
        </Button>
        {isDropdownOpen && (
          <div className="status-dropdown">
            <div onClick={() => handleUpdateStatus('To Do')}>To Do</div>
            <div onClick={() => handleUpdateStatus('In Progress')}>In Progress</div>
            <div onClick={() => handleUpdateStatus('Done')}>Done</div>
          </div>
        )}
        <div className="task-buttons">
          <Button color="danger" style={deleteButtonStyle} onClick={handleDeleteTask}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button color="primary" style={{ ...deleteButtonStyle, right: '60px' }} onClick={toggleUpdateModal}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      </div>
      <Modal isOpen={isUpdateModalOpen} toggle={toggleUpdateModal}>
        <ModalHeader toggle={toggleUpdateModal}>Update Task</ModalHeader>
        <ModalBody>
          <UpdateTask task={task} onTaskUpdated={onTaskUpdated} toggleUpdateModal={toggleUpdateModal} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleUpdateModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TaskItem;
