import * as actionTypes from '../actionTypes';

export const submitTodoListData = data => {
  return {
    type: actionTypes.SUBMIT_TODO_LIST,
    data
  };
};

export const removeTodoListData = data => {
  return {
    type: actionTypes.REMOVE_TODO_LIST,
    data
  }
}

export const undoTodoListData = data => {
  return {
    type: actionTypes.UNDO_TODO_LIST,
    data
  }
}

export const updateState = data => {
  return {
    type: actionTypes.UPDATE_STATE,
    data
  }
}