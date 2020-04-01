import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi'
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
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        />
                    <button className="button"type='submit'>Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02841"/>
                        Não Tenho Cadastro
                    </Link>
                </form>
           </section>

           <img src={heroesImg} alt="Heroes"/>
       </div> 
    );
}