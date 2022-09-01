import React, { Component } from "react";
import { connect } from "react-redux";
import { closeConfirmForm, removeTask } from "./redux/actions/toDoAppAction";
import { Color } from "./styledComponent/styledVariable";
import {
  BackDrop,
  Button,
  FlexDiv,
  NotifyDiv,
} from "./styledComponent/toDoStyled";

class ConfirmForm extends Component {
  render() {
    return (
      <>
        <NotifyDiv
          top="50%"
          translateY="-50%"
          padding="20px 30px"
          borderRadius="8px"
        >
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Do you want to delete this Task?
          </p>
          <FlexDiv flexDirection="row" justify="space-between" padding="0 20px">
            <Button solid onClick={this.props.handleRemoveTask}>
              YES
            </Button>
            <Button onClick={this.props.handleCloseForm}>NO</Button>
          </FlexDiv>
        </NotifyDiv>
        <BackDrop />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseForm: () => {
      dispatch(closeConfirmForm());
    },
    handleRemoveTask: () => {
      dispatch(removeTask());
    },
  };
};
export default connect(null, mapDispatchToProps)(ConfirmForm);
