import React, { useState, useEffect, FormEvent } from 'react';
import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../service/api';
import './style.css';
const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek] = useState('');
    const [time, setTime] = useState('');


    async function searchTeachers(e: FormEvent){
      e.preventDefault();

      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        }
      });
      setTeachers(reponse.data);

    }
    return(
        <div id="page-teacher-list" className="container">
            <Header title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                  <Select
                    name="subject"
                    label="Matéria"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    options={[
                      { value: 'Matemática', label: 'Matemática'},
                      { value: 'Química', label: 'Química'},
                      { value: 'Física', label: 'Física'},
                      { value: 'Biologia', label: 'Biologia'},
                      { value: 'Português', label: 'Português'},
                      { value: 'Educação Física', label: 'Educação Física'},
                      { value: 'Filosofia', label: 'Filosofia'},
                      { value: 'História', label: 'História'},
                      { value: 'Geografia', label: 'Geografia'},
                      { value: 'Sociologia', label: 'Sociologia'},
                      { value: 'Inglês', label: 'Inglês'},
                      { value: 'Artes', label: 'Artes'},
                    ]}/>
                    <Select
                      name="week_day"
                      label="Dia da semana"
                      value={week_day}
                      onChange={e => setWeek(e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo'},
                        { value: '1', label: 'Segunda Feira'},
                        { value: '2', label: 'Terça Feira'},
                        { value: '3', label: 'Quarta Feira'},
                        { value: '4', label: 'Quinta Feira'},
                        { value: '5', label: 'Sexta Feira'},
                        { value: '6', label: 'Sábado'}
                      ]}/>
                    <Input
                      type="time"
                      name="time"
                      label="Hora"
                      value={time}
                      onChange={e => setTime(e.target.value)}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </Header>

            <main>
                {teachers.map(teacher => (
                    <TeacherItem
                      key={teacher.id}
                      teacher={teacher}
                    />
                ))}
            </main>
        </div>
    );
}
export default TeacherList;
