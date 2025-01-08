import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "./TodoItem.css";

export default function TodoItem({ todo, index, deleteTodo, markAsDone }) {
    return (
        <li className="todo-item">
            <span className={todo.isDone ? "done-text" : ""}>
                {index + 1}. {todo.task}
            </span>
            <div>
                <button className="todo-button delete-button" onClick={() => deleteTodo(todo.id)}>
                <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="todo-button mark-button"  onClick={() => markAsDone(todo.id)}>
                <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </div>
        </li>
    );
}