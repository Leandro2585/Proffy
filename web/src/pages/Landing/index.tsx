import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import svgs from '../../assets/icons';
import api from '../../service/api';
const Landing: React.FC = () => {
    const [totalConn, setTotalConn] = useState(0);
    useEffect(() => {
        api.get('connections').then(response => {
           const { total } = response.data;
           setTotalConn(total);
        })
    },[totalConn])
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={svgs.logo} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img
                    src={svgs.landingImg}
                    alt="Plataforma de estudos."
                    className="hero-image"/>

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={svgs.studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={svgs.giveClassesIcon} alt="Ensinar"/>
                        Dar aulas
                    </Link>

                </div>

                <span className="total-connections">
                    Total de {totalConn } conexões já realizadas <img src={svgs.purpleHearthIcon} alt="Health Purple"/>
                </span>
            </div>
        </div>
    );
}
export default Landing;
