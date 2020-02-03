import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { submitTodoListData, removeTodoListData, undoTodoListData, updateState } from '../../Redux/Actions/TodoAction';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "", 
    };
  }

  componentDidUpdate(prevState, prevProps) {
    const { isRemove, isUndo, updateState } = this.props;
    if(isRemove || isUndo) updateState();
  }

  addTodoList = event => {
    const value = event.target.value;
    this.setState({
      text: value,
      id: Date.now(),
      isUndo: false
    })
  }

  submitTodoList = event => {
    event.preventDefault();
    const { text, id, isUndo } = this.state;
    const { updateTodoData } = this.props;
    const list = { id, text, isUndo};
    updateTodoData(list)
    this.setState({
      text: "",
    })
  }

  removeTodoList = item => {
    const { removeTodoData } = this.props;
    removeTodoData(item);
  }

  undoTodoList = item => {
    const { undoTodoData } = this.props;
    undoTodoData(item)
  }

  render() {
    const { text } = this.state;
    const { todoList } = this.props;
    return (
      <div className="form-container">
      <div className="header mb-2">
        <h2>Add Your List</h2>
      </div>
        <form className="form-inline" onSubmit={this.submitTodoList}>
          <div className="form-group">
            <input name="text" value={text} onChange={this.addTodoList} className="form-control" type="text" placeholder="Enter List"/>
          </div>
          <button className="btn btn-success ml-2" type="submit" disabled={!text}>Add List</button>
        </form>
        <div className="todo-content">
          <div className="added-list">
            <h5>Added List</h5>
            {todoList.filter(el => el.isUndo !== true).length > 0 ? <ul className="list-group mb-2">
              {todoList && todoList.filter(el => el.isUndo !== true).map(el => {
                const { text, id } = el;
                return (
                  <li key={id} className="list-group-item">
                    <div className="list-content">
                      <h4>{text}</h4>
                      <div className="btn-grp">
                        <button className="btn btn-sm btn-danger ml-2" onClick={() => this.removeTodoList(el)}>Remove</button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul> : <p>Empty List</p>}
          </div>
          <div className="removed-list">
            <h5>Remove List</h5>
            {todoList.filter(el => el.isUndo === true).length > 0 ? <ul className="list-group">
              {todoList && todoList.filter(el => el.isUndo === true).map(el => {
                const { text, id } = el;
                return (
                  <li key={id} className="list-group-item">
                    <div className="list-content">
                      <h4>{text}</h4>
                      <div className="btn-grp">
                        <button className="btn btn-sm btn-warning ml-2" onClick={() => this.undoTodoList(el)}>Undo</button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul> : <p>Empty List</p>}
          </div>
        </div>
      </div>
    )
  }
 }

 const mapStateToProps = state => {
   return {
     todoList: state.TodoData.todoList,
     isRemove: state.TodoData.isRemove,
     isUndo: state.TodoData.isUndo,
   }
 }

 const mapDispatchToProps = dispatch => ({
   updateTodoData: data => dispatch(submitTodoListData(data)),
   removeTodoData: data => dispatch(removeTodoListData(data)),
   undoTodoData: data => dispatch(undoTodoListData(data)),
   updateState: () => dispatch(updateState())
 })

 export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);