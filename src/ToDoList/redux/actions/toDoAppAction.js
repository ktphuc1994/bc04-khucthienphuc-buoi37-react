import {
  ADD_TASK,
  EDIT_TASK,
  SEARCH_TASK,
  GET_INPUT_SEARCH,
  GET_INPUT_TASK,
  REMOVE_TASK,
  RESET_SEARCH,
  RESET_TASK,
  TOGGLE_ADD_TASK_FORM,
  TOGGLE_COMPLETED_TASK,
  UPDATE_TASK,
  CLOSE_NOTIFY,
} from "../constants/toDoAppConstant";

export const getInputTask = (taksInfo) => {
  return {
    type: GET_INPUT_TASK,
    payload: taksInfo,
  };
};

export const toggleAddTaskForm = () => {
  return {
    type: TOGGLE_ADD_TASK_FORM,
  };
};

export const addTask = () => {
  return {
    type: ADD_TASK,
  };
};

export const toggleCompletedTask = (id, status) => {
  return {
    type: TOGGLE_COMPLETED_TASK,
    payload: { id, status },
  };
};

export const editTask = (taskInfo) => {
  return {
    type: EDIT_TASK,
    payload: taskInfo,
  };
};

export const updateTask = () => {
  return {
    type: UPDATE_TASK,
  };
};

export const resetTask = () => {
  return {
    type: RESET_TASK,
  };
};

export const removeTask = (id) => {
  return {
    type: REMOVE_TASK,
    payload: id,
  };
};

export const getInputFilter = (value) => {
  return {
    type: GET_INPUT_SEARCH,
    payload: value,
  };
};

export const filterTask = () => ({ type: SEARCH_TASK });

export const resetFilter = () => ({ type: RESET_SEARCH });

export const closeNotify = () => ({ type: CLOSE_NOTIFY });
