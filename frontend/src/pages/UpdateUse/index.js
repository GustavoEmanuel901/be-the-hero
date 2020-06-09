import React, {useState, useEffect} from 'react'
import '../RegisterOng/styles.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import axios from 'axios'
import api from '../../services/api'

export default function Register(){
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cidade, setCidade] = useState([])
    const [uf, setUf] = useState([])

    const [selectedUf, setSelectedUf] = useState('0')
    const [selectedCity, setselectedCity] = useState('0')

    const Id = localStorage.getItem('id')
    const Nome = localStorage.getItem('Nome')
    const Email = localStorage.getItem('Email')
    const Telefone = localStorage.getItem('Whatsapp')

    const history = useHistory();
    
    async function handleUpdate(e){

        e.preventDefault();

        const uf = selectedUf
        const cidade = selectedCity

        const data = {
            nome,
            email,
            telefone,
            cidade,
            uf,
        };


        try {
           await api.put(`cadusuario/${Id}`, data);
          // setOngs(ongs.filter(ongs => ongs.id === ongId))
           
           alert("Atualizado com sucesso, Faça o Logout para ver as alterações")
           history.push('/casos')
        } catch (err) {
            alert('Erro ao atualizar, tente novamente')
 
        }  
        
      }

      useEffect (() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
            const ufInitials = response.data.map(uf => uf.sigla)
            setUf(ufInitials)
        })
    })

    useEffect(() =>{
        if (selectedUf === '0')
        return

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response =>{
            const cityNames = response.data.map(city => city.nome)
            setCidade(cityNames)
        })
    }, [selectedUf])

    function handleSelectedUf(e){
        const uf = e.target.value

        setSelectedUf(uf)
    }

    function handleSelectedCity(e){
        const city = e.target.value

        setselectedCity(city)
    }




    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Atualizar</h1>
                    <p>Atualize os dados necessários, os demais coloque o mesmo valor atual</p>
                
                    <Link to="/casos" className="back-link">
                        <FiArrowLeft size={16} color="#e02841"/>
                        Voltar para Home
                    </Link>
                
                </section>

                <form onSubmit={handleUpdate}>
                        
                    <input
                        placeholder={Nome}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <input 
                        placeholder={Email}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder={Telefone}
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />

                    <div className="input-group">
                        <select name="uf" value={selectedUf} onChange={handleSelectedUf}>
                            <option value="0">Selecione Um estado</option>
                            {uf.map(uf =>(
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>

                        <select name='city' value={selectedCity} onChange={handleSelectedCity}>
                            <option value="0">Selecione uma cidade</option>
                            {cidade.map(cidade =>(
                                <option key={cidade} value={cidade}>{cidade}</option>
                            ))}
                        </select>
                    </div>
                    

                    <button className="button">Atualizar</button>
                </form>
            </div>
        </div>
    )
}