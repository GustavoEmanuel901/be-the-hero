import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Inicial from './pages/Inicial'
import LogonOng from './pages/LogonOng'
import LogonUse from './pages/LogonUse'
import RegisterOng from './pages/RegisterOng'
import RegisterUse from './pages/RegisterUse'
import Profile from './pages/Profile'
import ListCasos from './pages/ListCasos'
import ListOngs from './pages/ListOngs'
import ListOngsforOng from './pages/ListOngsforOng'
import NewIncident from './pages/NewIncident'
import UpdateOng from './pages/UpdateOng'
import UpdateUse from './pages/UpdateUse'
import DeleteUse from './pages/DeleteUse'
import DeleteOng from './pages/DeleteOng'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Inicial}/>
                <Route path='/logonOng' component={LogonOng}/>
                <Route path='/logonUse' component={LogonUse}/>
                <Route path='/registerOng' component={RegisterOng}/>
                <Route path='/registerUse' component={RegisterUse}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/casos' component={ListCasos}/>
                <Route path='/ongs' component={ListOngs}/>
                <Route path='/ongsforOng' component={ListOngsforOng}/>
                <Route path='/incidents/new' component={NewIncident}/>
                <Route path='/atualizarOng' component={UpdateOng}/>
                <Route path='/atualizarUse' component={UpdateUse}/>
                <Route path='/deleteUse' component={DeleteUse}/>
                <Route path='/deleteOng' component={DeleteOng}/>
            </Switch>
        </BrowserRouter>
    )
}