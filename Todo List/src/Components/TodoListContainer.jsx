import React, { useState, useEffect } from "react";
import TodoHeader from "./Header/TodoHeader";
import TodoInput from "./Input/TodoInput";
import TodoList from "./List/TodoList";
import TodoActions from "./Actions/TodoActions";
import { v4 as uuidv4 } from "uuid";
import "./TodoListContainer.css";

export default function TodoListContainer() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addNewTask = () => {
        if (newTodo.trim()) {
            setTodos([...todos, { task: newTodo, id: uuidv4(), isDone: false }]);
            setNewTodo("");
        }
    };

    return (
        <div className="todo-container">
            <h1 className="todo-title">Todo List</h1>
            
            <TodoHeader 
            completedTasks={todos.filter(t => t.isDone).length} 
            totalTasks={todos.length} 
            />
            
            <TodoInput 
                newTodo={newTodo} 
                updateTodo={(e) => setNewTodo(e.target.value)} 
                addNewTask={addNewTask} 
            />
            <hr />

            <div className="todo-items">
            <TodoList 
                todos={todos} 
                deleteTodo={(id) => setTodos(todos.filter(t => t.id !== id))} 
                markAsDone={(id) => setTodos(todos.map(t => t.id === id ? { ...t, isDone: true } : t))} 
            />
            </div>

            <TodoActions 
                markDoneAll={() => setTodos(todos.map(t => ({ ...t, isDone: true })))} 
                deleteAllTodos={() => setTodos([])} 
            />
        </div>
    );
}