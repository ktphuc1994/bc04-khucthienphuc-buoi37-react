import React, { Component } from "react";
import NotifyForm from "./NotifyForm";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";

export default class ToDoApp extends Component {
  render() {
    return (
      <div>
        <ToDoForm />
        <ToDoList />
        <NotifyForm />
      </div>
    );
  }
}
