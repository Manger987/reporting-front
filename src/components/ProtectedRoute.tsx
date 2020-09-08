import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRoute extends Omit<RouteProps, "component"> {
    component: React.ElementType;
    // any additional vars
  }

  export const ProtectedRoute: React.FC<ProtectedRoute> = ({ component: Component, ...rest }) => {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    
    return (
        <Route 
        {...rest}
        render={props => {
            if (user.token) {
                return <Component {...props} />;
            } else {
                return <Redirect to={
                    {
                        pathname:"/login",
                        state: {
                            from: props.location
                        }
                    }
                } />
            }
        }}
        />
    );
}