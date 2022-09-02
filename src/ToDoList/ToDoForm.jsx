import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addTask,
  getInputTask,
  resetTask,
  toggleAddTaskForm,
  updateTask,
} from "./redux/actions/toDoAppAction";
import {
  BackDrop,
  Button,
  Container,
  FlexDiv,
  Input,
} from "./styledComponent/toDoStyled";

class ToDoForm extends Component {
  componentDidUpdate() {
    if (this.props.isToDoFormOpened) {
      _.forEach(this.props.errInputList, (value, key) => {
        document.querySelector(`[data-error="${key}"]`).innerText =
          value.errMessage;
      });
    }
    // console.log(document.getElementById("thisTask"));
  }
  render() {
    if (this.props.isToDoFormOpened)
      return (
        <>
          <Container modal>
            <form>
              <FlexDiv>
                <label htmlFor="toDoTime" style={{ fontWeight: 600 }}>
                  TIME
                </label>
                <Input
                  type="text"
                  id="toDoTime"
                  name="time"
                  value={this.props.toDoTask.time}
                  onChange={this.props.handleGetInputTask}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      this.props.editTaskId === null
                        ? document.querySelector(".addToDoTask").click()
                        : document.querySelector(".updateToDoTask").click();
                    }
                  }}
                />
                <p data-error="time" style={{ color: "red" }}></p>
              </FlexDiv>
              <FlexDiv margin="20px 0">
                <label htmlFor="toDoTask" style={{ fontWeight: 600 }}>
                  TASK
                </label>
                <Input
                  type="text"
                  id="toDoTask"
                  name="task"
                  value={this.props.toDoTask.task}
                  onChange={this.props.handleGetInputTask}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      this.props.editTaskId === null
                        ? document.querySelector(".addToDoTask").click()
                        : document.querySelector(".updateToDoTask").click();
                    }
                  }}
                />
                <p data-error="task" style={{ color: "red" }}></p>
              </FlexDiv>
              <div>
                {this.props.editTaskId === null ? (
                  <Button
                    type="button"
                    className="addToDoTask"
                    solid
                    onClick={this.props.handleAddTask}
                  >
                    Add Task
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="updateToDoTask"
                    solid
                    onClick={this.props.handleUpdateTask}
                  >
                    Update Task
                  </Button>
                )}
                <Button
                  type="button"
                  mx="10px"
                  solid
                  btnColor="gray"
                  onClick={this.props.handleResetTask}
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  onClick={this.props.handleToggleAddTaskForm}
                >
                  Close
                </Button>
              </div>
            </form>
          </Container>
          <BackDrop onClick={this.props.handleToggleAddTaskForm} />
        </>
      );
  }
}

const mapStateToProps = (state) => ({
  toDoTask: state.toDoListReducer.toDoTask,
  isToDoFormOpened: state.toDoListReducer.modalControl.isToDoFormOpened,
  editTaskId: state.toDoListReducer.editTaskId,
  errInputList: state.toDoListReducer.errInputList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleAddTaskForm: () => {
      dispatch(toggleAddTaskForm());
    },
    handleGetInputTask: (e) => {
      let { name, value } = e.target;
      dispatch(getInputTask({ name, value }));
    },
    handleAddTask: () => {
      dispatch(addTask());
    },
    handleResetTask: () => {
      dispatch(resetTask());
    },
    handleUpdateTask: () => {
      dispatch(updateTask());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoForm);
