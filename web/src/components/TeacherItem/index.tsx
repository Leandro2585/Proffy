import React from 'react';
import svgs from '../../assets/icons';
import './style.css';
interface Props {
  teacher:{
    profile_url: string;
    name: string;
    bio?: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    whatsapp: string;
  }
}
import api from '../../service/api';
const TeacherItem: React.FC<Props> = ({ teacher }) => {
  function createConnection(){
    api.post('connections', {
      user_id: teacher.id
    })
  }
    return (
        <article className="teacher-item">
                    <header>
                        <img src={teacher.profile_url} alt={teacher.name}/>
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                    </header>
                    <p>{teacher.bio}</p>
                    <footer>
                        <p>Preço/hora<strong>{teacher.cost}</strong></p>
                        <a target="blank" onClick={createConnection} href={`https://wa.me/${teacher.whatsapp}`} type="button">
                            <img src={svgs.whatsappIcon} alt="whatsapp"/>
                            Entrar em contato
                        </a>
                    </footer>
                </article>
    );
}
export default TeacherItem;
