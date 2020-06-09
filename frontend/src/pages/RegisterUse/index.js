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
    const [selectedCidade, setselectedCidade] = useState('0')

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const uf = selectedUf
        const cidade = selectedCidade

        const data = {
            nome,
            email,
            telefone,
            cidade,
            uf,
        };

        try {
            const response = await api.post('cadusuario', data)
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/logonUse')
        } catch (err){
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
            setCidade(cityNames)
        })
        }, [selectedUf])

    function handleSelectedUf(e){
        const uf = e.target.value

        setSelectedUf(uf)
    }

    function handleSelectedCity(e){
        const city = e.target.value

        setselectedCidade(city)
    }

    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as Ongs a encontrarem as soluções de seus casos</p>
                
                    <Link to="/logonUse" className="back-link">
                        <FiArrowLeft size={16} color="#e02841"/>
                        Voltar para Home
                    </Link>
                
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Seu Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input 
                        placeholder="WhatsApp com DDD"
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

                        <select name='city' value={selectedCidade} onChange={handleSelectedCity}>
                            <option value="0">Selecione uma cidade</option>
                            {cidade.map(cidade =>(
                                <option key={cidade} value={cidade}>{cidade}</option>
                            ))}
                        </select>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}