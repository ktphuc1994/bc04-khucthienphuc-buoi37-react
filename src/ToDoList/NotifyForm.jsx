import React, { Component } from "react";
import { connect } from "react-redux";
import { closeNotify } from "./redux/actions/toDoAppAction";
import { Color } from "./styledComponent/styledVariable";
import { AwesomeI, BackDrop, NotifyDiv } from "./styledComponent/toDoStyled";

class NotifyForm extends Component {
  componentDidMount() {
    this.myTimeOut = setTimeout(() => {
      this.props.handleCloseNotify();
    }, 3000);
  }
  render() {
    return (
      <>
        <NotifyDiv borderRadius="8px">
          {this.props.isNotifyAnErr ? (
            <AwesomeI
              className="fa-regular fa-circle-xmark"
              margin="0 0 10px 0"
              textColor="red"
              fontSize="2rem"
            ></AwesomeI>
          ) : (
            <AwesomeI
              className="fa-regular fa-circle-check"
              margin="0 0 10px 0"
              textColor={Color.green500}
              fontSize="2rem"
            ></AwesomeI>
          )}
          <p style={{ fontSize: "1.2rem" }}>{this.props.notifyContent}</p>
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
  notifyContent: state.toDoListReducer.notifyContent,
  isNotifyAnErr: state.toDoListReducer.isNotifyAnErr,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseNotify: () => {
      dispatch(closeNotify());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyForm);
