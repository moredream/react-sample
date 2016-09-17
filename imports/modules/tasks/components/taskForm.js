import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, actions } from 'react-redux-form';

class taskForm extends React.Component {
  handleSubmit(task) {
    let { dispatch } = this.props;

    // Do whatever you like in here.
    // You can use actions such as:
    // dispatch(actions.submit('user', somePromise));
    // etc.
  }
  render() {
    let { tasks } = this.props;

    return (
      <Form model="task"
        onSubmit={(task) => this.handleSubmit(task)}>
        <Field model="task.firstName">
          <label>First name:</label>
          <input type="text" />
        </Field>

        <Field model="task.lastName">
          <label>Last name:</label>
          <input type="text" />
        </Field>

        <button type="submit">
          Finish registration, { task.firstName } { task.lastName }!
        </button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {  tasks: state.Tasks.tasks };
}

export default connect(mapStateToProps)(taskForm);