import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import CreateToDo from './pages/CreateTodo';
const Routes: React.FC = () => {
    return(
        <BrowserRouter>
                <Route path="/" exact component={Landing}/>
                <Route path="/study" component={TeacherList}/>
                <Route path="/give-classes" component={TeacherForm}/>
                <Route path="/to-do" component={CreateToDo}/>
        </BrowserRouter>
    )
}
export default Routes;