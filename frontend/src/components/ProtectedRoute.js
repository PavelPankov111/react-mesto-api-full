import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ children, ...props }) {
    if (props.loggedIn) {
    return <Route {...props}>{children}</Route>
    } else {
      return <Redirect to='/sing-in' />
    }
  }
  

export default ProtectedRoute;