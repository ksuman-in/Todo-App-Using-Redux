import * as actionTypes from '../actionTypes';

const initialState = {
  todoList: [],
};

const updateTodoList = (state, action) => {
  const { data } = action;
  const { todoList } = state;
  const tempTodoList = todoList;
  tempTodoList.push(data)
  return { ...state, todoList: tempTodoList, isRemove: false, isUndo: false }
}

const removeTodoListData = (state, action) => {
  const { data } = action;
  const { todoList } = state;
  const tempTodoList = todoList;
  const index = tempTodoList.findIndex(el => el.id === data.id);
  tempTodoList[index].isUndo = true;
  return { ...state, todoList: tempTodoList, isRemove: true, isUndo: false }
}

const undoTodoListData = (state, action) => {
  const { data } = action;
  const { todoList } = state;
  const tempTodoList = todoList;
  const index = tempTodoList.findIndex(el => el.id === data.id);
  tempTodoList[index].isUndo = false;
  return { ...state, todoList: tempTodoList, isUndo: true, isRemove: false }
}

const updateStateData = (state, action) => {
  return { ...state, isRemove: false, isUndo: false };
}

const TodoData = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SUBMIT_TODO_LIST:
      return updateTodoList(state, action);
    case actionTypes.REMOVE_TODO_LIST:
      return removeTodoListData(state, action);
    case actionTypes.UNDO_TODO_LIST:
      return undoTodoListData(state, action);
    case actionTypes.UPDATE_STATE:
      return updateStateData(state, action);
    default:
      return state;
  }
}

export default TodoData;