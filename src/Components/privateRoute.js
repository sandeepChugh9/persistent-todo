import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userAuth } from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = userAuth.isAuthenticated();
    return (
        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;