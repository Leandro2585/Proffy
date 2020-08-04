import React from 'react';
import svgs from '../../assets/icons';
import './style.css';
interface Props {
    profile_url?: string;
    name?: string;
    description?: string;
    
}
const TeacherItem: React.FC<Props> = () => {
    return (
        <article className="teacher-item">
                    <header>
                        <img src="https://avatars3.githubusercontent.com/u/49343139?s=60&v=4" alt="Leandro Real"/>
                        <div>
                            <strong>Leandro Real</strong>
                            <span>Lógica de Programação</span>
                        </div>
                    </header>
                    <p>
                        Lorem ipsum dolor sit
                        <br/><br/>
                        amet consectetur adipisicing elit. Veritatis, non, inventore deserunt assumenda laborum similique repudiandae nam doloremque eaque facere quas eligendi pariatur libero harum provident, nesciunt atque nobis porro.
                    </p>
                    <footer>
                        <p>Preço/hora<strong>R$ 30,00</strong></p>
                        <button type="button">
                            <img src={svgs.whatsappIcon} alt="whatsapp"/>
                            Entrar em contato
                        </button>
                    </footer>
                </article>
    );
}
export default TeacherItem;