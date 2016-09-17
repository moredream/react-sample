import React, { Component } from 'react';
import { bindActionCreators } from 'redux'

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
import Filter from '../components/filter';

const App = class extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBreadClick = this.handleBreadClick.bind(this);
  }
  
  handleBreadClick(filterName) {
     const { selectFilter } = this.props
 
    selectFilter(filterName);

  }

  handleSubmit(val) {
    // Do anything you want with the form value
    const { dispatch, task, addTask } = this.props
    addTask(val);
  }

  render() {
    const { dispatch, tasks, task, taskForm, addTask, activeID } = this.props
    const handleAddTask = (e) => {
 //     e.preventDefault();
      // Have to use findDOMNode with react-bootstrap
      const node = findDOMNode(this.refs.taskInput);
      const task = {text: node.value};

      addTask(task);
 
      node.value = null;
    }
    
    let sortedTask = tasks ||[];
          let sorted = []

    if (sortedTask.length > 0 && activeID !== "") {
      sortedTask= tasks.filter(item => item.priority.startsWith(activeID));
    }

    if (sortedTask !== []){
      sortedTask.sort(function(a,b){ return b.priority > a.priority});
    }

 
    const renderTasks = () => {
      return sortedTask.map((task) => (
        <Task key={task._id} task={task} />
      ));
    }

    return (
      <div className="container">
        <header>
          <h1>Todo List ({(tasks ||[] ).length})</h1>
                  <div>
          <Filter isActive = {activeID} handleBreadClick={this.handleBreadClick}  />
        </div>
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
          <Field model="task.priority"   validators={{
            required: (val) => val.length
          }}>
            <label>Priority</label>
            <select   className="form-control">
              <option value="">Select Priority</option>
              <option value="a">Low</option>
              <option value="b">Medium</option>
              <option value="c">High</option>
            </select>
          </Field>
                    <Errors model="task.priority"
          messages={{
            required: 'Please select an priority.',

          }}/>
          <button className="btn btn-primary">Submit!</button>
        </Form>


        <ul>
          {renderTasks()}
        </ul>        

      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
   activeID: state.Tasks.activeID || '',
   task: state.task, 
   tasks: state.Tasks.tasks 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

//export default connect(state => ({ task: state.task, tasks: state.Tasks.tasks }))(App);
// export default connect()(App);

// export default App
