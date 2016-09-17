import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {
  Button,
  ButtonToolbar,
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { Field, Form, actions, Errors } from 'react-redux-form';

import Task from '../containers/task';

const App = class extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  emailIsValid(email) {
  // terrible validation, I know
  return email && email.length > 2;
  }
  
  handleSubmit(val) {
    // Do anything you want with the form value
    const { dispatch, task, addTask } = this.props
    addTask(val);
  }

  render() {
    const { dispatch, tasks, task, taskForm, addTask } = this.props
    const handleAddTask = (e) => {
 //     e.preventDefault();
      // Have to use findDOMNode with react-bootstrap
      const node = findDOMNode(this.refs.taskInput);
      const task = {text: node.value};

      addTask(task);
 
      node.value = null;
    }

    const renderTasks = () => {
      return (tasks||[]).map((task) => (
        <Task key={task._id} task={task} />
      ));
    }

    return (
      <div className="container">
        <header>
          <h1>Todo List ({(tasks ||[] ).length})</h1>
        </header>

       <Form model="task"
        onSubmit={(task) => this.handleSubmit(task)}>
          <Field model="task.text"   updateOn="blur"
          validators={{
            required: (val) => val.length,
            length: (val) => val.length >= 4
          }}>
            <label>Text</label>
            <input type="text" className="form-control"/>
          </Field>
          <Errors model="task.text"
          messages={{
            required: 'Please provide an text name.',
            length: (val) => `please type at least ${val} length characters.`,
          }}/>
          <Field model="task.priority">
            <label>Priority</label>
            <input type="text" className="form-control"/>
          </Field>

          <button className="btn btn-primary">Submit!</button>
        </Form>

        <ul>
          {renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect(state => ({ task: state.task, tasks: state.Tasks.tasks }))(App);
// export default connect()(App);

// export default App
