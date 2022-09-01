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
  REMOVE_CONFIRM,
  CLOSE_CONFIRM_FORM,
} from "../constants/toDoAppConstant";

export const getInputTask = (taksInfo) => {
  return {
    type: GET_INPUT_TASK,
    payload: taksInfo,
  };
};

export const toggleAddTaskForm = () => ({ type: TOGGLE_ADD_TASK_FORM });

export const addTask = () => ({ type: ADD_TASK });

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

export const updateTask = () => ({ type: UPDATE_TASK });

export const resetTask = () => ({ type: RESET_TASK });

export const removeConfirm = (id) => ({
  type: REMOVE_CONFIRM,
  payload: id,
});

export const removeTask = () => ({ type: REMOVE_TASK });

export const getInputSearch = (value) => {
  return {
    type: GET_INPUT_SEARCH,
    payload: value,
  };
};

export const searchTask = () => ({ type: SEARCH_TASK });

export const resetSearch = () => ({ type: RESET_SEARCH });

export const closeNotify = () => ({ type: CLOSE_NOTIFY });

export const closeConfirmForm = () => ({ type: CLOSE_CONFIRM_FORM });
