import React, {useState} from 'react';
import { FiLogIn,FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory} from 'react-router-dom'

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function Logon(){
    const [id, setId] = useState('') 
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response =  (await api.post('sessions', {id} )).data
            localStorage.setItem('ongId', id)
            for(let x of response){
                //console.log(x.name)
                localStorage.setItem('ongName', x.name)
                localStorage.setItem('whatsapp', x.whatsapp)
                localStorage.setItem('email', x.email)
                localStorage.setItem('city', x.city)
                localStorage.setItem('uf', x.uf)
            }
            history.push('/profile')
        } catch(err){
            alert('falha no Login, tente novamente')    
        }
    }

    return (
       <div className="logon-container">
           <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon como ONG</h1>

                    <input 
                        placeholder="Sua ID de Acesso"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        />
                    <button className="button"type='submit'>Entrar</button>

                    <Link to="/registerOng" className="back-link">
                        <FiLogIn size={16} color="#e02841"/>
                        Não Tenho Cadastro
                    </Link>

                    <Link to="/" className="back-link">
                        <FiArrowLeft  size={16} color="#e02841"/>
                        Voltar para Inicio
                    </Link>
                </form>
           </section>

           <img src={heroesImg} alt="Heroes" id="people"/>
       </div> 
    );
}