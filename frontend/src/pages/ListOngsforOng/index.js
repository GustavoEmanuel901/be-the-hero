import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower  } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'
import { MdSystemUpdate } from 'react-icons/md'

import '../Profile/styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Profile(){
    const [ongs, setOngs] = useState([])
    const [pesquisa, setPesquisa] = useState('')    
    
    const history = useHistory()
    const Nome = localStorage.getItem('ongName')
    //const ongId = localStorage.getItem('ongId')

    useEffect(()=>{
        if(ongs === "" || pesquisa === ""){
            api.get(`ongs`).then(response =>{
                setOngs(response.data)
            })
        }

        api.get(`buscaOngs/${pesquisa}`).then(response =>{
            setOngs(response.data)
        })
    })

   
    function handleLogout(){
        localStorage.clear()

        history.push('/')
    }

    function ir(){
        history.push('/deleteOng')
    }

    function irUpdate(){
        history.push('/atualizarOng')
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo(a), {Nome}</span>

                <Link className="button" to='/profile'>
                    Ver Casos Cadastradas
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
                placeholder="Digite Aqui (Use Letras Maiúsculas e Mininúsculas)"
                onChange={e => setPesquisa(e.target.value)}/>
            </form>

            <h1>ONGS Cadastradas</h1>
            <ul>
                {ongs.map(ongs => (
                     (
                        <li key={ongs.id}>
                    <strong>NOME:</strong>
                     <p>
                        {ongs.name}
                     </p>

                    <strong>E-MAIL:</strong>
                     <p>{ongs.email}</p>

                    <strong>WHATSAPP:</strong>
                     <p>{ongs.whatsapp}</p>

                     <strong>CIDADE:</strong>
                     <p>{ongs.city}</p>

                     <strong>UF:</strong>
                     <p>{ongs.uf}</p>
                    
                </li>
                    )
                ))}
            </ul>


        </div>
           
    )
}