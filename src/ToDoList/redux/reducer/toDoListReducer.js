import _ from "lodash";
import { nanoid } from "nanoid";
import {
  initialInputErrList,
  initialModalControl,
  initialToDoTask,
} from "../../utils";
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
  modalControl: { ...initialModalControl },
  toDoTask: { ...initialToDoTask },
  toDoList: [],
  editTaskId: null,
  removeTaskId: null,
  searchText: "",
  searchKey: "",
  searchList: [],
  isNotifyAnErr: false,
  notifyContent: "",
  errInputList: _.cloneDeep(initialInputErrList),
};

const toDoListReducer = (state = initialState, { type, payload }) => {
  let index; // define index incase needed for findIndex;
  let isTaskValid = true; // for Validating the Input Field (of Adding/Updating Task Form)
  switch (type) {
    //START OPEN and CLOSE the Adding/Updating Task Form;
    case TOGGLE_ADD_TASK_FORM:
      if (state.modalControl.isToDoFormOpened) {
        state.modalControl.isToDoFormOpened = false;
      } else {
        state.modalControl.isToDoFormOpened = true;
      }
      return { ...state };

    //START GET the input value from Adding/Updating Task Form;
    case GET_INPUT_TASK:
      let { value, name, isValid, errMessage } = payload;
      state.errInputList[name] = { isValid, errMessage }; // Handle the error message (as validator detected)
      state.toDoTask = { ...state.toDoTask, [name]: value };
      return { ...state };

    // START ADDING task from Input From to Task List;
    case ADD_TASK:
      _.forEach(state.errInputList, (value, key) => {
        // CHECK the validity of each Input field (of Adding/Updating Task Form)
        if (value.isValid) {
          isTaskValid &= true;
        } else if (value.errMessage === null) {
          state.errInputList[
            key
          ].errMessage = `${key.toUpperCase()} cannot be empty`; // ASSIGN error Message if the Input field is Empty
          isTaskValid &= false;
        } else {
          isTaskValid &= false;
        }
      });
      if (isTaskValid) {
        state.toDoList.push({ ...state.toDoTask, id: nanoid() });
        state.toDoList = [...state.toDoList];
        state.toDoTask = { ...initialToDoTask };
        state.errInputList = _.cloneDeep(initialInputErrList);
        state.modalControl.isNotifyOpened = true;
        state.isNotifyAnErr = false;
        state.notifyContent = "Task successfully added!";
        return { ...state };
      }
      state.modalControl.isNotifyOpened = true;
      state.isNotifyAnErr = true;
      state.notifyContent = "Please check the Error Message";
      return { ...state, errInputList: { ...state.errInputList } };

    // START RESET the Input field of Adding/Updating Task Form;
    case RESET_TASK:
      state.toDoTask = { ...initialToDoTask };
      state.errInputList = _.cloneDeep(initialInputErrList);
      state.editTaskId = null;
      state.modalControl.isNotifyOpened = true;
      state.isNotifyAnErr = false;
      state.notifyContent = "Task Form Reset!";
      return { ...state };

    // START TOGGLING the complete status of each task in Task List
    case TOGGLE_COMPLETED_TASK:
      index = _.findIndex(state.toDoList, ["id", payload.id]);
      if (payload.status) {
        state.toDoList[index].status = false;
      } else {
        state.toDoList[index].status = true;
      }
      return { ...state, toDoList: [...state.toDoList] };

    // START HANDLING when click the Edit button (of each Task) in Task List
    case EDIT_TASK:
      state.modalControl.isToDoFormOpened = true;
      state.toDoTask = payload;
      state.editTaskId = payload.id;
      _.forEach(state.errInputList, (value) => {
        value.isValid = true;
        value.errMessage = null;
      });
      return { ...state };

    // START UPDATING task from Input From to Task List
    case UPDATE_TASK:
      _.forEach(state.errInputList, (value, key) => {
        // CHECK the validity of each Input field (of Adding/Updating Task Form)
        if (value.isValid) {
          isTaskValid &= true;
        } else if (value.errMessage === null) {
          state.errInputList[
            key
          ].errMessage = `${key.toUpperCase()} cannot be empty`; // ASSIGN error Message if the Input field is Empty
          isTaskValid &= false;
        } else {
          isTaskValid &= false;
        }
      });
      if (isTaskValid) {
        index = _.findIndex(state.toDoList, ["id", state.editTaskId]);
        state.toDoList[index] = { ...state.toDoTask };
        state.toDoTask = { ...initialToDoTask };
        state.errInputList = _.cloneDeep(initialInputErrList);
        state.editTaskId = null;
        state.modalControl.isNotifyOpened = true;
        state.isNotifyAnErr = false;
        state.notifyContent = "Task updated!";
        return { ...state, toDoList: [...state.toDoList] };
      }
      state.modalControl.isNotifyOpened = true;
      state.isNotifyAnErr = true;
      state.notifyContent = "Please check the Error Message";
      return { ...state, errInputList: { ...state.errInputList } };

    //START TOGGING the Confirm Form when click the Remove Button (of each Task) in Task List
    case REMOVE_CONFIRM:
      state.modalControl.isConfirmFormOpened = true;
      state.removeTaskId = payload;
      return { ...state };

    // START CLOSING the above Confirm Form (for removing task)
    case CLOSE_CONFIRM_FORM:
      state.modalControl.isConfirmFormOpened = false;
      return { ...state };

    // START REMOVING task from Task List
    case REMOVE_TASK:
      index = _.findIndex(state.toDoList, ["id", state.removeTaskId]);
      state.toDoList.splice(index, 1);
      state.modalControl.isNotifyOpened = true;
      state.isNotifyAnErr = false;
      state.notifyContent = "Task removed!";
      state.modalControl.isConfirmFormOpened = false;
      return { ...state, toDoList: [...state.toDoList] };

    // START GET the Input value of Search Input in ToDoList
    case GET_INPUT_SEARCH:
      return { ...state, searchText: payload };

    // START FILTERING the Task List as per condition from Input Search
    case SEARCH_TASK:
      state.modalControl.isSearchOn = true;
      state.searchKey = state.searchText;
      return { ...state };

    // START RESET search filtering, no more Task List Filtering
    case RESET_SEARCH:
      state.modalControl.isSearchOn = false;
      state.searchText = "";
      state.modalControl.isNotifyOpened = true;
      state.isNotifyAnErr = false;
      state.notifyContent = "Search Reset";
      return { ...state };

    // START CLOSING Notification Form
    case CLOSE_NOTIFY:
      state.modalControl.isNotifyOpened = false;
      return { ...state };

    default:
      return state;
  }
};

export default toDoListReducer;
