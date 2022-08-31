import React, { Component } from "react";
import { connect } from "react-redux";
import NotifyForm from "./NotifyForm";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";

class ToDoApp extends Component {
  render() {
    return (
      <div>
        <ToDoForm />
        <ToDoList />
        {this.props.isNotifyOpened && <NotifyForm />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isNotifyOpened: state.toDoListReducer.isNotifyOpened,
});

export default connect(mapStateToProps, null)(ToDoApp);
