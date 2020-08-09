import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../service/api';
import svgs from '../../assets/icons';
import './style.css';
const TeacherForm: React.FC = () => {
  const history = useHistory();

  // Teacher
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  // Class
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''},
  ]);

  function addNewScheduleItem(){
    setScheduleItems([
      ...scheduleItems,
      { week_day: 1, from: '10:00 AM', to: '6:00 PM'},
    ]);
  }
  function handleCreateClass(e: FormEvent){
    e.preventDefault();
    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then((response) => {
        alert('Cadastro realizado com sucesso!');
        localStorage.setItem('class_id', response.data.class_id);
        history.push('/');

    }).catch((err) => {
      alert('Erro ao cadastrar!'+err);
    })
  }
  function setScheduleItemValue(position: number, field: string, value: string){
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position){
          return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }
    return(
        <div id="page-teacher-form" className="container">
            <Header
              title="Que incrível que você quer dar aulas."
              description="O primeiro passo é preencher esse formulário de inscrição"/>
            <main>
              <form onSubmit={handleCreateClass}>
                <fieldset>
                  <legend>Seus dados </legend>
                  <Input
                    name="name"
                    label="Nome completo"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />

                  <Input
                    name="avatar"
                    label="Avatar"
                    value={avatar}
                    onChange={e => setAvatar(e.target.value)}
                  />
                  <Input
                    name="whatsapp"
                    label="Whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}/>
                  <Textarea
                    name="bio"
                    label="Biografia"
                    value={bio}
                    onChange={e => setBio(e.target.value)}/>
                </fieldset>
                <fieldset>
                  <legend>Sobre a aula </legend>
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
                  <Input
                    name="cost"
                    label="Custo da sua hora por aula"
                    value={cost}
                    onChange={e =>  setCost(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                  <legend>
                    Horários Disponíveis
                    <button
                      type="button"
                      onClick={addNewScheduleItem}
                    >
                      + Novo horário
                    </button>
                  </legend>
                  {scheduleItems.map((scheduleItem, index) => {
                    return (
                      <div key={scheduleItem.week_day} className="schedule-item">
                        <Select
                          name="week_day"
                          label="Dia da semana"
                          value={scheduleItem.week_day}
                          onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                          options={[
                            { value: '0', label: 'Domingo'},
                            { value: '1', label: 'Segunda Feira'},
                            { value: '2', label: 'Terça Feira'},
                            { value: '3', label: 'Quarta Feira'},
                            { value: '4', label: 'Quinta Feira'},
                            { value: '5', label: 'Sexta Feira'},
                            { value: '6', label: 'Sábado'}
                          ]}
                        />
                          <Input
                            name="from"
                            label="Das"
                            type="time"
                            value={scheduleItem.from}
                            onChange={e => (setScheduleItemValue(index, 'from', e.target.value))}
                          />
                          <Input
                            name="to"
                            label="Até"
                            type="time"
                            value={scheduleItem.to}
                            onChange={e => (setScheduleItemValue(index, 'to', e.target.value))}
                          />
                      </div>
                    );
                  })}

                </fieldset>
                

                <footer>
                  <p>
                    <img src={svgs.warningIcon} alt="Aviso Importante"/>
                    Importante: <br/>
                    Preencha todos os dados
                  </p>
                  <button type="submit">
                    Salvar cadastro
                  </button>
                </footer>
              </form>
            </main>
        </div>
    );
}
export default TeacherForm;
