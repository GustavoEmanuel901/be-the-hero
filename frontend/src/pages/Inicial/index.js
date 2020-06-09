import React from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link} from 'react-router-dom'

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Inicial(){
    return (
        <div className="container">
            <section className="inicial">
                <img src={logoImg} alt="Be The Hero"/>

                <Link to="/logonOng" className="back-link">
                    <FiLogIn size={16} color="#e02841"/>
                    ONG
                </Link>

                <Link to="/logonUse" className="back-link">
                    <FiLogIn size={16} color="#e02841"/>
                    Pessoa Física
                </Link>
            </section>
            <img src={heroesImg} id="people" alt="Heroes"/>
        </div>
    )
}