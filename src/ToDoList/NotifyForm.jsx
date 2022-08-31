import React, { Component } from "react";
import { connect } from "react-redux";
import { closeNotify } from "./redux/actions/toDoAppAction";
import { BackDrop, NotifyDiv } from "./styledComponent/toDoStyled";

class NotifyForm extends Component {
  componentDidMount() {
    this.myTimeOut = setTimeout(() => {
      this.props.handleCloseNotify();
    }, 3000);
  }
  render() {
    // if (this.props.isNotifyOpened)
    return (
      <>
        <NotifyDiv>
          <p>{this.props.notifyContent}aaaaaa</p>
        </NotifyDiv>
        <BackDrop
          bgColor="transparent"
          zIndex="2"
          onClick={this.props.handleCloseNotify}
        />
      </>
    );
  }
  componentWillUnmount() {
    clearTimeout(this.myTimeOut);
  }
}

const mapStateToProps = (state) => ({
  // isNotifyOpened: state.toDoListReducer.isNotifyOpened,
  notifyContent: state.toDoListReducer.notifyContent,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseNotify: () => {
      dispatch(closeNotify());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyForm);
