import React, { Component } from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import MainPage from './components/MainPage';
import AddPage from './components/AddPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path="/add_new_item" component={AddPage} />
    </Route>
);