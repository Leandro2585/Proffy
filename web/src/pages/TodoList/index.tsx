import React from 'react';
import PageHeader from '../../components/Header';
import TodoItem from '../../components/TodoItem';
const ToDoList = () => {
  
  return(
    <div id="page-todo-list" className="container">
        <PageHeader title="Estes são os seus To-Dos"/>
        <TodoItem/>
    </div>
  );
}
