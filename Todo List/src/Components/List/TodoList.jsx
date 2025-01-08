import React from "react";
import TodoItem from "../Item/TodoItem";
import "./TodoList.css";

export default function TodoList({ todos, deleteTodo, markAsDone }) {
    return (
        <ul className="todo-list">
            {todos.map((todo, index) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    deleteTodo={deleteTodo}
                    markAsDone={markAsDone}
                />
            ))}
        </ul>
    );
}