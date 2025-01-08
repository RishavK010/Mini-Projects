import React from "react";
import "./TodoActions.css";

export default function TodoActions({ markDoneAll, deleteAllTodos }) {
    return (
        <div className="todo-actions">
            <button onClick={markDoneAll} className="mark-button">Mark All Done</button>
            <button onClick={deleteAllTodos}className="delete-button">Delete All</button>
        </div>
    );
}