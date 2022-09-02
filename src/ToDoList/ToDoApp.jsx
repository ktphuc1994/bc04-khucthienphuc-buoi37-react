import React, { Component } from "react";
import { connect } from "react-redux";
import ConfirmForm from "./ConfirmForm";
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
        {this.props.isConfirmFormOpened && <ConfirmForm />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isNotifyOpened: state.toDoListReducer.modalControl.isNotifyOpened,
  isConfirmFormOpened: state.toDoListReducer.modalControl.isConfirmFormOpened,
});

export default connect(mapStateToProps, null)(ToDoApp);
