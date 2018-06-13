import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './index';

import {Switch, HashRouter as Router, Route, IndexRoute, Link} from 'react-router-dom';

const {Home, Mask, ActionSheet, Button, Page, Swiper} = Pages;

const routes = [
    {path: '/', component: Home, exact: true},
    {path: '/mask', component: Mask},
    {path: '/actionsheet', component: ActionSheet},
    {path: '/button', component: Button},
    {path: '/page', component: Page},
    {path: '/swiper', component: Swiper}
];

const App = (props, context) =>
    (
        <Router>
            <Switch>
                {
                    routes.map( route=>(
                        <Route key={route.path} path={route.path} exact={route.exact} component={route.component}/>
                    ))
                }
            </Switch>
        </Router>
    );

ReactDOM.render(<App/>, document.getElementById('container'));

