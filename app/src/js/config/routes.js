// React dependencies
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// Redux dependencies
import { Provider } from 'react-redux';
import store, { history } from './store';

// Pages (and container 'App' component)
import Layout from '../components/layout';
import DashboardPage from '../pages/dashboard';

const routes = (
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" component={ Layout }>
                <IndexRoute component={ DashboardPage } />
                { /* <Route path="categories" component={ CategoriesPage } /> */ }
            </Route>
        </Router>
    </Provider>
)

export default routes;