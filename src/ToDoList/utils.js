export const initialToDoTask = {
  id: "",
  time: "",
  task: "",
  status: false,
};

export const initialModalControl = {
  isToDoFormOpened: false,
  isSearchOn: false,
  isNotifyOpened: false,
  isConfirmFormOpened: false,
};

export const initialInputErrList = {
  time: { isValid: false, errMessage: null },
  task: { isValid: false, errMessage: null },
};
