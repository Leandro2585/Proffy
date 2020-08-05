import React from 'react';
import { Link } from 'react-router-dom';
import svgs from '../../assets/icons';
import './style.css';
interface Props {
    title: string;
    description?: string;
}
const Header: React.FC<Props> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={svgs.backIcon} alt="voltar"/>
                </Link>
                <img src={svgs.logo} alt="Proffy"/>
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description ? <p>{props.description}</p> : null}
                {props.children}
            </div>
        </header>
    );
}
export default Header;
