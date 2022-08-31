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
  render() {
    if (this.props.isToDoFormOpened)
      return (
        <>
          <Container modal>
            <form>
              <FlexDiv>
                <label htmlFor="toDoTime" style={{ fontWeight: 600 }}>
                  Time
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
              </FlexDiv>
              <FlexDiv>
                <label htmlFor="toDoTask" style={{ fontWeight: 600 }}>
                  Task
                </label>
                <Input
                  type="text"
                  id="toDoTask"
                  name="toDo"
                  value={this.props.toDoTask.toDo}
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
              </FlexDiv>
              <div>
                {this.props.editTaskId === null && (
                  <Button
                    type="button"
                    className="addToDoTask"
                    solid
                    onClick={this.props.handleAddTask}
                  >
                    Add Task
                  </Button>
                )}
                {this.props.editTaskId !== null && (
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
                  mx="5px"
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
  isToDoFormOpened: state.toDoListReducer.isToDoFormOpened,
  editTaskId: state.toDoListReducer.editTaskId,
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
