import React, {useState, useEffect} from 'react'
import '../RegisterOng/styles.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import axios from 'axios'
import api from '../../services/api'

export default function Register(){
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState([])
    const [uf, setUf] = useState([])

    const [selectedUf, setSelectedUf] = useState('0')
    const [selectedCity, setselectedCity] = useState('0')

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const ongEmail = localStorage.getItem('email')
    const ongWhatsapp = localStorage.getItem('whatsapp')

    const history = useHistory();
    
    async function handleUpdate(e){

        e.preventDefault();

        const uf = selectedUf
        const city = selectedCity

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };


        try {
           await api.put(`ongs/${ongId}`, data);
          // setOngs(ongs.filter(ongs => ongs.id === ongId))
           
           alert("Atualizado com sucesso, Faça o Logout para ver alterações")
           history.push('/profile')
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
            setCity(cityNames)
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
                
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02841"/>
                        Voltar para Home
                    </Link>
                
                </section>

                <form onSubmit={handleUpdate}>
                        
                    <input
                        placeholder={ongName}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        placeholder={ongEmail}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder={ongWhatsapp}
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
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
                            {city.map(city =>(
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    

                    <button className="button">Atualizar</button>
                </form>
            </div>
        </div>
    )
}