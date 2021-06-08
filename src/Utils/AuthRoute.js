import React from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../Redux/Slices/UserSlice';
import {Route, Redirect} from 'react-router-dom';



function AuthRoute({component: Component, ...rest}) {
    const user= useSelector(selectUser);
    return (
       <Route
        {...rest}
        render={(props) => user? <Redirect to="/" />: <Component {...props}/>}
        />

    )
}

export default AuthRoute
