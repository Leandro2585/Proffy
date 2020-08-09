import React from 'react';
import { Link } from 'react-router-dom';
import svgs from '../../assets/icons';
import './style.css';
import api from '../../service/api';

interface Props {
  teacher:{
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    whatsapp: string;
  }
}
const TeacherItem: React.FC<Props> = ({ teacher }) => {
  function createConnection(){

    api.post('connections', {
      user_id: teacher.id
    })
  }
    return (
        <article className="teacher-item">
                    <header>
                        <img src={teacher.avatar} alt={teacher.name}/>
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                    </header>
                    <p>{teacher.bio}</p>
                    <footer>
                        <p>Preço/hora<strong>{teacher.cost}</strong></p>
                        <Link onClick={createConnection} to="/to-do" type="button">
                            <img src={svgs.rocket} alt="To-do"/>
                            Ver mais detalhes
                        </Link>
                    </footer>
                </article>
    );
}
export default TeacherItem;
