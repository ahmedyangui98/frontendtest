import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const UpdateTask = ({ task, onTaskUpdated, isOpen, toggle }) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleUpdateTask = () => {
    onTaskUpdated(updatedTask);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="updateTitle">Title</Label>
            <Input
              type="text"
              id="updateTitle"
              value={updatedTask.title}
              onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="updateDescription">Description</Label>
            <Input
              type="textarea"
              id="updateDescription"
              value={updatedTask.description}
              onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="updateDueDate">Due Date</Label>
            <Input
              type="date"
              id="updateDueDate"
              value={updatedTask.due_date}
              onChange={(e) => setUpdatedTask({ ...updatedTask, due_date: e.target.value })}
            />
          </FormGroup>
          <Button color="primary" onClick={handleUpdateTask}>
            <FontAwesomeIcon icon={faPencilAlt} /> Update Task
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default UpdateTask;
