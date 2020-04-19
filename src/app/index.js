import React from 'react';
import {observer} from 'mobx-react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Header from './components/header.js'
import Menu from './components/menu.js'
import Categories from './components/categories.js'
import Card from './components/card.js'
import Stat from './components/stat.js'

@observer class App extends React.Component{
    render(){
       return (
        <Router>
            <Menu></Menu>
            <div className="container">
                <Header></Header>
                <Switch>
                    <Route path='/' component={Categories} exact={true}/>
                    <Route path='/card' component={Card} exact={true}/>
                    <Route path='/stat' component={Stat} exact={true}/>
                    <Route component={() =><Redirect to={'/'} />}/>
                </Switch>
            </div>
        </Router>
       );
    }
}

export default App;