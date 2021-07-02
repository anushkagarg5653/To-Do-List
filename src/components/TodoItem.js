import React, { Component, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteTodo, editTodo, toggleComplete } from "../redux/todoSlice";
import TodoList from "./TodoList";
import {TiEdit} from 'react-icons/ti';

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => {
    return state.todos
})
  const handleCompleteClick = () => {
    dispatch(toggleComplete({ id: id, completed: !completed }));
  };

  const handleDeleteClick = () => {
	  dispatch(deleteTodo({id: id}))
  };

  let [edit, setEdit] = useState("")
  const [value, setValue] = useState("");
  const inputRef = useRef(null)

  const submitUpdate = event =>{
    event.preventDefault()
    edit.title = value
    dispatch(editTodo(edit))
    setEdit("")
  }
  if (edit !== "") {
    return (<form onSubmit={submitUpdate} className='todo-form edit' >
        <input
            placeholder='Update todo'
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            name='text'
            className='todo-input'
            ref={inputRef}
        />
        <button className='btn btn-primary'
            onClick={submitUpdate} >Update</button>
    </form >);
}
  
 
  return (
    
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            onChange={handleCompleteClick}
            checked={completed}
          ></input>
          {title}
        </span>
        <button onClick={handleDeleteClick} className="btn btn-danger">Delete</button>
        <TiEdit onClick={() => {
                    setEdit(TodoItem)
                    setValue(TodoItem.title)
                }} />  
      </div>
    </li>
  );
};

export default TodoItem;
