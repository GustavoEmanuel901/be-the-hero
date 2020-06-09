import React, {useState, useEffect} from 'react'
import './styles.css'
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


    const history = useHistory();

    async function handleRegister(e){
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
            const response = await api.post('ongs', data)
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/')
        } catch (err){
            console.log(err)
            alert('Erro no Cadastro')  
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

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG</p>
                
                    <Link to="/logonOng" className="back-link">
                        <FiArrowLeft size={16} color="#e02841"/>
                        Voltar para Home
                    </Link>
                
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input 
                        placeholder="WhatsApp com DDD"
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

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}