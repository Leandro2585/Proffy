import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/Header';
import Input from '../../components/Input';
import TodoItem from '../../components/TodoItem';
import Dropzone from '../../components/Dropzone';
import api from '../../service/api';
import './style.css';
const CreateToDo = () => {
  const [fileHeader, setFileHeader] = useState<File>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [check, setCheck] = useState(0);
  const [topics, setTopics] = useState([ { todo_item: '' }]);

  function setTodoItemValue(position: number, value: string){
    const updatedTopicItems = topics.map((topicItem, index) => {
      if(index === position){
          return { ...topicItem, todo_item: value };
      }
      return topicItem;
    });

    setTopics(updatedTopicItems);
    }

  function addNewTodo(){
    setTopics([...topics,{todo_item: ''},
    ]);
  }
  function handleSubmit(e: FormEvent){
    e.preventDefault();
    const data = new FormData;
    data.append('title',title);
    data.append('description',description);
    if(fileHeader){
      data.append('media',fileHeader);
    }
      api.post('todo', data)
      .then(() => alert('OK cadastro realizado'))
      .catch(err => alert({ "ERROR": err }));
  }
  return(
    <div id="page-todo-create" className="container">
      <form onSubmit={handleSubmit}>
        <PageHeader>
          <Dropzone onFileUploaded={setFileHeader}/>
        </PageHeader>
          <Input
            type="text"
            label="Titúlo"
            value={title}
            onChange={e => setTitle(e.target.value)}/>
          <Input
            type="text"
            label="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}/>
          <ul>
          {topics.map((topic, index) => {
            return (
            <li key={index}>
              <input
                type="checkbox"
                value={check}
                onChange={e => setCheck(check === 0? 1 : 0)}/>
              <Input
                className="input-todo"
                type="text"
                value={topic.todo_item}
                onChange={e => setTodoItemValue(index, e.target.value)}/>
            </li>
            );
          })}
          </ul>
          <section>
          <button
            type="button"
            onClick={addNewTodo}
          >
                      + Novo tópico
          </button>
          </section>
          <button type="submit" className="submit">Salvar</button>

        </form>
    </div>
  );
}
export default CreateToDo;
