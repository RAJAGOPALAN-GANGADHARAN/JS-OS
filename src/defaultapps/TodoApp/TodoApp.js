import React, { Component } from 'react'
import './TodoApp.css'

const List = ({ list, onDelete }) => (
    <ul className="list">
      {list.map((item, idx) => (
        <li className="task">
          {item} 
          <span className="delete" onClick={() => onDelete(idx)}>
            X
          </span>
        </li>
      ))}
    </ul>
  );

class TodoApp extends Component{
    constructor() {
        super();
        this.state = {
          input: "",
          list: []
        };
    
        this.handleInput = this.handleInput.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
      }
    
      handleInput(event) {
        this.setState({ input: event.target.value });
      }
      addTodo() {
        const updatedList = [...this.state.list, this.state.input];
        this.setState({ list: updatedList, input: "" });
      }
      deleteTodo(idx) {
        const filter = (item, index) => index !== idx;
        const updatedList = this.state.list.filter(filter);
        this.setState({ list: updatedList });
      }
    
      render() {
        const { input, list } = this.state;
    
        return (
          <div id="TodoApp">
            <h1 className="header-name">TO-DO APP</h1>
            <h4 className="small-header-name">exclusively built for JS-OS</h4>
            <input className="input" value={input} onChange={this.handleInput} placeholder="type a Todo.." />
            <button className="todoadd" onClick={this.addTodo}>add</button>
            <List list={list} onDelete={this.deleteTodo} />
          </div>
        );
      }
}
export default TodoApp