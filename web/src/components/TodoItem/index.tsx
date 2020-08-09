import React, { useState } from 'react';
import './style.css';
interface TodoProps{
    title?: string;
    description?: string;
}
const ToDo: React.FC<TodoProps> = ({ title, description}) => {

  return(
    <article className="todo-item">
      <header>
        <img src="#" alt="header-img"/>
        <div>
          <strong>Revolução Francesa</strong>
          <span>Nessa aula falaremos um pouco sobre a Revolução Francesa</span>
        </div>
      </header>
      <input type="checkbox" name="introdução"/>
      <p>Breve introdução ao contexto histórico</p>
    </article>
  );
}
export default ToDo;
