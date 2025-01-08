import React from "react";
import "./TodoInput.css";

export default function TodoInput({ newTodo, updateTodo, addNewTask }) {
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addNewTask();
        }
    };

    return (
        <div className="todo-input-container">
            <input
                className="todo-input"
                placeholder="Type Something"
                value={newTodo}
                onChange={updateTodo}
                onKeyPress={handleKeyPress}
            />
            <button className="todo-button" onClick={addNewTask}>
                Add Task
            </button>
        </div>
    );
}