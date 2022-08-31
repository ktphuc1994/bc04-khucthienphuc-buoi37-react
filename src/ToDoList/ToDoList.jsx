import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editTask,
  filterTask,
  getInputFilter,
  removeTask,
  resetFilter,
  toggleAddTaskForm,
  toggleCompletedTask,
} from "./redux/actions/toDoAppAction";
import { Color } from "./styledComponent/styledVariable";
import {
  AwesomeI,
  Button,
  Container,
  FlexDiv,
  Input,
  TableStyled,
  TrStyled,
} from "./styledComponent/toDoStyled";

class ToDoList extends Component {
  state = {
    completedList: [],
    unCompletedList: [],
  };
  renderListOfToDo = (list) => {
    if (list.length !== 0)
      return (
        <>
          {list.map((task, index) => (
            <TrStyled key={task.id.toString() + index} bgColor={Color.gray200}>
              <td align="center">
                {task.status ? (
                  <AwesomeI
                    className="fa-solid fa-circle-check"
                    fontSize="1.2rem"
                    textColor="green"
                    cursor="pointer"
                    onClick={() => {
                      this.props.handleToggleCompletedTask(
                        task.id,
                        task.status
                      );
                    }}
                  ></AwesomeI>
                ) : (
                  <AwesomeI
                    className="fa-regular fa-circle-check"
                    fontSize="1.2rem"
                    cursor="pointer"
                    onClick={() => {
                      this.props.handleToggleCompletedTask(
                        task.id,
                        task.status
                      );
                    }}
                  ></AwesomeI>
                )}
              </td>
              <td>{task.time}</td>
              <td>{task.toDo}</td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <AwesomeI
                  className="fa-regular fa-pen-to-square"
                  margin="3px 0"
                  textColor="gold"
                  fontSize="1.2rem"
                  cursor="pointer"
                  onClick={() => {
                    this.props.handleEditTask(task);
                  }}
                ></AwesomeI>
                <AwesomeI
                  className="fa-regular fa-trash-can"
                  margin="3px 0"
                  textColor="tomato"
                  fontSize="1.2rem"
                  cursor="pointer"
                  onClick={() => {
                    this.props.handleRemoveTask(task.id);
                  }}
                ></AwesomeI>
              </td>
            </TrStyled>
          ))}
        </>
      );
    return (
      <TrStyled bgColor={Color.gray200}>
        <td colSpan={4}>Empty List</td>
      </TrStyled>
    );
  };
  static getDerivedStateFromProps(props) {
    console.log(props);
    let completedList, unCompletedList;
    if (props.isSearchOn) {
      let searchList = _.filter(props.toDoList, (task) => {
        let index = task.toDo
          .toLowerCase()
          .indexOf(props.searchKey.toLowerCase());
        return index !== -1;
      });
      completedList = searchList.filter((task) => task.status);
      unCompletedList = searchList.filter((task) => !task.status);
    } else {
      completedList = props.toDoList.filter((task) => task.status);
      unCompletedList = props.toDoList.filter((task) => !task.status);
    }
    return { completedList, unCompletedList };
  }
  render() {
    // let completedList, UnCompletedList;
    // if (this.props.isSearchOn) {
    //   completedList = this.props.searchList.filter((task) => task.status);
    //   UnCompletedList = this.props.searchList.filter((task) => !task.status);
    // } else {
    //   completedList = this.props.toDoList.filter((task) => task.status);
    //   UnCompletedList = this.props.toDoList.filter((task) => !task.status);
    // }
    return (
      <Container maxWidth="800px">
        <h1 style={{ fontSize: "2rem", textAlign: "center" }}>TO DO LIST</h1>
        <Button solid onClick={this.props.handleToggleAddTaskForm}>
          Add New Task
        </Button>
        <FlexDiv flexDirection="row" alignItems="center" justify="center">
          <div style={{ position: "relative", flexGrow: "1" }}>
            <Input
              type="text"
              placeholder="Find task"
              focusSearch
              onChange={this.props.handleGetInputFilter}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.querySelector(".searchToDo").click();
                }
              }}
            />
            <AwesomeI
              className="searchToDo fa-solid fa-magnifying-glass"
              cursor="pointer"
              position="absolute"
              top="50%"
              right="10px"
              translateY="-50%"
              margin="0"
              onClick={this.props.handleFilterTask}
            ></AwesomeI>
          </div>
          {this.props.isSearchOn && (
            <Button onClick={this.props.handleResetFilter} mx="5px">
              Reset
            </Button>
          )}
        </FlexDiv>
        <TableStyled>
          <thead>
            <TrStyled textTranform="uppercase" textColor={Color.gray50}>
              <th style={{ width: "10%" }}>Status</th>
              <th style={{ width: "20%" }}>Time</th>
              <th style={{ width: "55%" }}>Task</th>
              <th style={{ width: "15%", textAlign: "center" }}>Edit</th>
            </TrStyled>
          </thead>
          <tbody>
            <TrStyled bgColor={Color.gray400} textTranform="uppercase" fw="600">
              <td colSpan={4}>Uncompleted Task</td>
            </TrStyled>
            {this.renderListOfToDo(this.state.unCompletedList)}
            <TrStyled bgColor={Color.gray400} textTranform="uppercase" fw="600">
              <td colSpan={4}>Completed Task</td>
            </TrStyled>
            {this.renderListOfToDo(this.state.completedList)}
          </tbody>
        </TableStyled>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  toDoList: state.toDoListReducer.toDoList,
  searchList: state.toDoListReducer.searchList,
  searchKey: state.toDoListReducer.searchKey,
  isSearchOn: state.toDoListReducer.isSearchOn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleAddTaskForm: () => {
      dispatch(toggleAddTaskForm());
    },
    handleGetInputFilter: (e) => {
      let value = e.target.value;
      dispatch(getInputFilter(value));
    },
    handleFilterTask: () => {
      dispatch(filterTask());
    },
    handleResetFilter: () => {
      dispatch(resetFilter());
    },
    handleToggleCompletedTask: (id, status) => {
      dispatch(toggleCompletedTask(id, status));
    },
    handleEditTask: (taskInfo) => {
      dispatch(editTask(taskInfo));
    },
    handleRemoveTask: (id) => {
      dispatch(removeTask(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);