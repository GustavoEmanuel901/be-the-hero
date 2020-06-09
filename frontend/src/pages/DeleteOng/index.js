import React, {useState} from 'react';

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'
import {useHistory, Link} from 'react-router-dom'

export default function Inicial(){

    const [ong, setOng] = useState([])
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    async function handleDeleteOng(e){
        e.preventDefault()

        try {
           await api.delete(`ongs/${ongId}`,{ headers: {
               Authorization: ongId,
           }
           });
           setOng(ong.filter(ong => ong.id !== ongId))
           alert("Conta Deletada com sucesso")
           localStorage.clear()
           
           
        } catch (err) {
            console.log(err)
            alert('Erro ao deletar caso, tente novamente')
        }  

        history.push('/')
      }


    return (
        <div className="container">
            <section className="inicial">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleDeleteOng}>
                    <h1>Tem certeza que quer deletar usa conta?</h1>

                    <button type="submit" className='button'>
                        Sim
                    </button>

                    <Link to='/profile' className='button'>
                        Não    
                    </Link> 
                </form>                    
            </section>
            <img src={heroesImg} alt="Heroes" id="people"/>
        </div>
    )
}