import "./Authentication.css";
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import {Link} from 'react-router-dom';
import {useSpring, animated} from 'react-spring';
import React from 'react';

const Authentication = () => {
    
    return (
        
        <div className="authentication">
            
            <Link to="/"  className="login__logo"><h1>Shreyan's DOJO</h1></Link>
                <div className="authentication__brief">
                    <p>Here is a social-media for you to get connected to friends and family.</p>
                </div>
            
                <div className="authentication__comps">
                    <Login/>
                    <SignUp/>
                </div>
            
            
            
               
        </div>
        
    )
}

export default Authentication
