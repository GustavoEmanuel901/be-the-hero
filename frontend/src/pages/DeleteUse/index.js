import React, {useState} from 'react';

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'
import {useHistory, Link} from 'react-router-dom'

export default function Inicial(){

    const [usuario, setUsuario] = useState([])
    const Id = localStorage.getItem('id')
    const history = useHistory()

    async function handleDeleteUsuario(e){
        e.preventDefault()

        try {
           await api.delete(`cadusuario/${Id}`,{ headers: {
               Authorization: Id,
           }
           });
           setUsuario(usuario.filter(usuario => usuario.id !== Id))
           alert("Conta Deletada com sucesso")
           localStorage.clear()
           
           
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente')
        }  

        history.push('/')
      }


    return (
        <div className="container">
            <section className="inicial">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleDeleteUsuario}>
                    <h1>Tem certeza que quer deletar usa conta?</h1>

                    <button type="submit" className='button'>
                        Sim
                    </button>

                    <Link to='/casos' className='button'>
                        Não    
                    </Link> 
                </form>                    
            </section>
            <img src={heroesImg} alt="Heroes" id="people"/>
        </div>
    )
}