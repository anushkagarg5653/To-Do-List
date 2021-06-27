import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../actions';

const List = (props) => {
    return (
        <ul>
            {props.todos.map((todo, index) =>(
                <li className="list" key={index}>{todo.message} <button className="delete" onClick={() => props.dispatch(deleteTodo(todo.id))}>Delete</button> </li>
            ) )}
        </ul>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todos.data,
});

export default connect(mapStateToProps)(List);
