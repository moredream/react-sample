import React, { Component, PropTypes } from 'react';
import {
  Button,
} from 'react-bootstrap';

const Task = (props) => {
  const { removeTask } = props
  const handleRemoveTask = (taskId, e) => {
    e.preventDefault();
    removeTask(taskId);
  }
  const renderPriority = (val) => {
    switch(val) {
    case "a":
        return "Low"
        break;
    case "b":
        return "Medium"
        break;
    case "c":
        return "High"
        break;
    default:
        return "Not Defined"
    } 
  }
  const {text, priority,_id} = props.task;
  return (
    <li>{text} {renderPriority(priority)}<Button bsStyle="danger" style={{float: "right"}}
                       onClick={handleRemoveTask.bind(this, _id)}> Remove Task </Button></li>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task
