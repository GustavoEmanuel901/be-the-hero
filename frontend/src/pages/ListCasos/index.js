import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower} from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'
import { MdSystemUpdate } from 'react-icons/md'

import '../Profile/styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Profile(){
    const [incidents, setIncidents] = useState([])
    const [pesquisa, setPesquisa] = useState('');
    
    const history = useHistory()
    const Nome = localStorage.getItem('Nome')
    //const ongId = localStorage.getItem('ongId')

    
    
    useEffect(()=>{
        if(incidents === "" || pesquisa === ""){
            api.get(`incidents`).then(response =>{
                setIncidents(response.data)
            })
        }

        api.get(`buscaCasos/${pesquisa}`).then(response =>{
            setIncidents(response.data)
        })
    })
   
    function handleLogout(){
        localStorage.clear()

        history.push('/')
    }

    function ir(){
        history.push('/deleteUse')
    }

    function irUpdate(){
        history.push('/atualizarUse')
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo(a), {Nome}</span>

                <Link className="button" to='/ongs'>
                    Ver Ongs Cadastradas
                </Link>
                <div className="buttons">
                    <button type='button' onClick={irUpdate}>
                        <MdSystemUpdate size={18} color='#e02041'/>
                    </button>

                    <button type='button' onClick={handleLogout}>
                        <FiPower size={22} color='#e02041'/>
                    </button>

                    <button type='button' onClick={ir} >
                        <GiCancel size={22} color="#e02041"/>
                    </button>
                </div>
                
            </header>

            <form>
                <h1 className="textSearch">Pesquise aqui</h1>
                <input className="pesquisa"
                placeholder="Digite Aqui (Use Letras Maiúsculas e Minúsculas)"
                onChange={e => setPesquisa(e.target.value)}/>
            </form>


            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                     (
                        <li key={incident.id}>
                    <strong>CASO:</strong>
                     <p>
                        {incident.title}
                     </p>

                    <strong>DESCRIÇÃO:</strong>
                     <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                     <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                     <strong>NOME DA ONG:</strong>
                     <p>{incident.name}</p>

                     <strong>ENTRE EM CONTATO POR:</strong>
                     <div className="contatos">
                        <p><b>Whatsapp:</b> {incident.whatsapp}</p>
                        <p><b>E-mail:</b> {incident.email}</p>
                     </div>
                </li>
                    )
                ))}
            </ul>

           

        </div>
           
    )
}