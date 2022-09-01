import _ from "lodash";
import { nanoid } from "nanoid";
import { initialToDoTask } from "../../utils";
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
  CLOSE_CONFIRM_FORM,
  REMOVE_CONFIRM,
} from "../constants/toDoAppConstant";

const initialState = {
  toDoTask: { ...initialToDoTask },
  toDoList: [],
  isToDoFormOpened: false,
  editTaskId: null,
  removeTaskId: null,
  searchText: "",
  searchKey: "",
  isSearchOn: false,
  searchList: [],
  isNotifyOpened: false,
  notifyContent: "",
  isConfirmFormOpened: false,
};

const toDoListReducer = (state = initialState, { type, payload }) => {
  let index;
  switch (type) {
    case TOGGLE_ADD_TASK_FORM:
      if (state.isToDoFormOpened) {
        state.isToDoFormOpened = false;
      } else {
        state.isToDoFormOpened = true;
      }
      return { ...state };
    case GET_INPUT_TASK:
      state.toDoTask = { ...state.toDoTask, [payload.name]: payload.value };
      return { ...state };
    case ADD_TASK:
      state.toDoList.push({ ...state.toDoTask, id: nanoid() });
      state.toDoList = [...state.toDoList];
      state.toDoTask = { ...initialToDoTask };
      state.isNotifyOpened = true;
      state.notifyContent = "Task successfully added!";
      return { ...state };
    case RESET_TASK:
      state.toDoTask = { ...initialToDoTask };
      state.editTaskId = null;
      return { ...state };
    case TOGGLE_COMPLETED_TASK:
      index = _.findIndex(state.toDoList, ["id", payload.id]);
      if (payload.status) {
        state.toDoList[index].status = false;
      } else {
        state.toDoList[index].status = true;
      }
      return { ...state, toDoList: [...state.toDoList] };
    case EDIT_TASK:
      state.isToDoFormOpened = true;
      state.toDoTask = payload;
      state.editTaskId = payload.id;
      return { ...state };
    case UPDATE_TASK:
      index = _.findIndex(state.toDoList, ["id", state.editTaskId]);
      state.toDoList[index] = { ...state.toDoTask };
      state.toDoTask = { ...initialToDoTask };
      state.editTaskId = null;
      state.isNotifyOpened = true;
      state.notifyContent = "Task updated!";
      return { ...state, toDoList: [...state.toDoList] };
    case REMOVE_CONFIRM:
      state.isConfirmFormOpened = true;
      state.removeTaskId = payload;
      return { ...state };
    case CLOSE_CONFIRM_FORM:
      return { ...state, isConfirmFormOpened: false };
    case REMOVE_TASK:
      index = _.findIndex(state.toDoList, ["id", state.removeTaskId]);
      state.toDoList.splice(index, 1);
      state.isNotifyOpened = true;
      state.notifyContent = "Task removed!";
      state.isConfirmFormOpened = false;
      return { ...state, toDoList: [...state.toDoList] };
    case GET_INPUT_SEARCH:
      return { ...state, searchText: payload };
    case SEARCH_TASK:
      // state.searchList = _.filter(state.toDoList, (task) => {
      //   let index = task.toDo
      //     .toLowerCase()
      //     .indexOf(state.searchText.toLowerCase());
      //   return index !== -1;
      // });
      state.isSearchOn = true;
      state.searchKey = state.searchText;
      return { ...state };
    case RESET_SEARCH:
      state.isSearchOn = false;
      state.searchText = "";
      return { ...state };
    case CLOSE_NOTIFY:
      return { ...state, isNotifyOpened: false };
    default:
      return state;
  }
};

export default toDoListReducer;
