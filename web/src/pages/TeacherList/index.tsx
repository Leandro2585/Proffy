import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import api from '../../service/api';
import './style.css';
import TeacherItem from '../../components/TeacherItem';
const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState([]);
    useEffect(()=> {
        api.get('classes').then(response => {
            setTeachers(response.data)
        });
    }, []);
    return(
        <div id="page-teacher-list" className="container">
            <Header title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <div className="input-block">
                        <label htmlFor="subject">Disciplina</label>
                        <input type="text" name="subject"/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="week_day">Dia da semana</label>
                        <input type="text" name="week_day"/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="time">Horas</label>
                        <input type="text" name="time"/>
                    </div>
                </form>
            </Header>

            <main>
                {teachers.map(teacher => (
                    <TeacherItem name="" description="" profile_url=""/>
                ))}
            </main>
        </div>
    );   
}
export default TeacherList;