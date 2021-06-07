import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
    return (
        <Route 
            {...props}
            render={(props) => (
                localStorage.getItem('accessToken') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            )}
        />
    )
}

export default PrivateRoute;