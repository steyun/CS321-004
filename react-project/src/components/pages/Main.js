import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Home from './Home';
import addNew from './AddNew';
import fourOfour from './404';
import items from './items';
const Main = (classes) => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/add_new_item' component={addNew}/>
            <Route path = '/items/' component={items}/>
            <Route component={fourOfour}/>
        </Switch>
    </main> 
)

export default Main